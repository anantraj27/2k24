import db from "../configuration/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { io } from "../app.js";
// import { dirname } from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const dashboardHome = (req, res) => {
  res.sendFile(path.join(__dirname, "../../../public/scheduled-events.html"));
};



export const getDashboard = async (req, res) => {

    const userId = req.user.id; // ya token se
    console.log("Dashboard user:", req.user);
console.log("Dashboard userId:", req.user.id);

    try {

        const [
            statsResult,
            userTrackResult
        ] = await Promise.all([

            db.query(`
                SELECT
                    COUNT(*) FILTER (
                        WHERE status = 'live'
                    ) AS live_events,

                    COUNT(*) FILTER (
                        WHERE status = 'upcoming'
                    ) AS upcoming_events,

                    COUNT(*) FILTER (
                        WHERE winner IS NOT NULL
                        AND winner <> 'Not Decided Yet'
                    ) AS winners_published

                FROM scheduled_events
            `),

            db.query(
                `
                SELECT
                    e.id AS event_id,
                    e.name AS event_name,
                    er.team_name,
                    tm.role

                FROM team_members tm

                INNER JOIN event_registrations er
                ON tm.registration_id = er.id

                INNER JOIN events e
                ON er.event_id = e.id

                WHERE tm.user_id = $1
                `,
                [userId]
            )

        ]);
console.log("event aaya ---->",statsResult.rows[0])
        return res.status(200).json({

            success: true,

            stats: statsResult.rows[0],

            myEvents: userTrackResult.rows

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


const query = `
SELECT
    se.id AS scheduled_id,
    e.name,
    e.id AS event_id,
    se.event_date,
    se.event_time,

    teamA.id AS team_a_id,
    teamB.id AS team_b_id,

    CASE
        WHEN se.participation_type = 'solo'
        THEN ua.name
        ELSE teamA.team_name
    END AS team_a,

    CASE
        WHEN se.participation_type = 'solo'
        THEN ub.name
        ELSE teamB.team_name
    END AS team_b,

    se.venue,
    se.status,
    se.winner,
    se.participation_type

FROM scheduled_events se

INNER JOIN events e
ON se.event_id = e.id

INNER JOIN event_registrations teamA
ON se.participant_a_id = teamA.id

INNER JOIN event_registrations teamB
ON se.participant_b_id = teamB.id

INNER JOIN users ua
ON teamA.captain_id = ua.id

INNER JOIN users ub
ON teamB.captain_id = ub.id
`;

export const  geteventByEventId= async(req,res)=>{
     const id  =Number(req.params.id) ;

 let result ;

    try {
        
        result = await db.query(
             query+ `WHERE se.id = $1;
            `,
            [id]

    );
        
          return res.status(200).json({
            success:true,
            message:"data delivered",
            data:result.rows
        });    
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:error.message,
            data:null
        })

        
    }


}



export const  geteventByStatus = async (req,res)=>{

    const {status}  = req.query;

    console.log("status is ",status)

 let result ;

    try {
        
        result = await db.query(
             query + `WHERE se.status = $1;
            `,
            [status]

    );
        
          return res.status(200).json({
            success:true,
            message:"data delivered",
            data:result.rows
        });    
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:error.message,
            data:null
        })

        
    }
}

export const getEvents = async(req,res)=>{

    console.log("Get event Hit hua ");

try {
const result =await db.query(` SELECT json_agg(
    json_build_object(
          'id' ,e.id,
        'Active', e.active,
        'name', e.name,
        'type', e.type,
        'category', e.category,
        'image_link', e.image_link,
        'min_players', e.min_players,
        'max_players', e.max_players,

        'fields',

        CASE
            WHEN e.type = 'team/solo' THEN
            json_build_object(

                'team',
                (
                    SELECT json_agg(
                        json_build_object(
                            'type', ef.field_type,
                            'placeholder', ef.placeholder,
                            'field_name',ef.field_name
                        )
                        ORDER BY ef.display_order
                    )
                    FROM event_fields ef
                    WHERE ef.event_id = e.id
                    AND ef.field_group = 'team'
                ),

                'solo',
                (
                    SELECT json_agg(
                        json_build_object(
                            'type', ef.field_type,
                            'placeholder', ef.placeholder,
                            'field_name',ef.field_name
                        )
                        ORDER BY ef.display_order
                    )
                    FROM event_fields ef
                    WHERE ef.event_id = e.id
                    AND ef.field_group = 'solo'
                )

            )

            ELSE
            (
                SELECT json_agg(
                    json_build_object(
                        'type', ef.field_type,
                        'placeholder', ef.placeholder,
                        'field_name',ef.field_name
                    )
                    ORDER BY ef.display_order
                )
                FROM event_fields ef
                WHERE ef.event_id = e.id
            )

        END

    )
) AS events
FROM events e
WHERE e.active = TRUE;`
)

  return res.status(200).json({
            success:true,
            message:"data delivered",
            data:result.rows[0]
        });    
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:error.message,
            data:null
        })

        
    }


}

export const searchUsers= async(req,res)=>{

    try{

        const q = req.query.q;

        if(!q){

            return res.json({
                users:[]
            });

        }

        const {rows} = await db.query(
            `
            SELECT
                id,
                name
                
            FROM users
            WHERE email ILIKE $1
            LIMIT 10
            `,
            [`%${q}%`]
        );

        res.json({

            users:rows

        });

    }
    catch(err){

        console.log(err);

        res.status(500).json({

            message:"Server Error"

        });

    }

}

export const eventRegister = async (req, res) => {

    const client = await db.connect();

    try {

        await client.query("BEGIN");

        const {
            team_name,
            event_name,
            participation_type,
            event_id,
            captain_phone,
            captain_registration_no,
            gender,
            player_ids = []
        } = req.body;

        const captainId =req.user.id;

        // =====================================
        // Captain cannot add himself as player
        // =====================================

        if (player_ids.includes(captainId)) {

            await client.query("ROLLBACK");

            return res.status(400).json({
                success: false,
                message: "You are already the team captain. Please remove yourself from the player list."
            });

        }

        // =====================================
        // Captain / Player already registered ?
        // =====================================

        const allMembers = [captainId, ...player_ids];

        const { rows: alreadyRegistered } = await client.query(
            `
            SELECT
                tm.user_id,
                u.name
            FROM team_members tm

            INNER JOIN event_registrations er
            ON tm.registration_id = er.id

            INNER JOIN users u
            ON tm.user_id = u.id

            WHERE
                er.event_id = $1,
                AND er.participation_type = $2,
                AND tm.user_id = ANY($3::int[])
            `,
            [event_id,participation_type, allMembers]
        );

        if (alreadyRegistered.length > 0) {

            await client.query("ROLLBACK");

            return res.status(400).json({
                success: false,
                message: `${alreadyRegistered[0].name} is already registered in this event.`
            });

        }

        // =====================================
        // Event Registration
        // =====================================

        const { rows } = await client.query(
            `
            INSERT INTO event_registrations
            (
                team_name,
                event_name,
                participation_type,
                event_id,
                captain_phone,
                captain_id,
                captain_registration_no,
                gender
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING id
            `,
            [
                team_name || null,
                event_name,
                participation_type,
                event_id,
                captain_phone,
                captainId,
                captain_registration_no,
                gender
            ]
        );

        const registrationId = rows[0].id;

        // =====================================
        // Captain Entry
        // =====================================

        await client.query(
            `
            INSERT INTO team_members
            (
                registration_id,
                user_id,
                role
            )
            VALUES ($1,$2,$3)
            `,
            [
                registrationId,
                captainId,
                "captain"
            ]
        );

        // =====================================
        // Player Entries
        // =====================================

        for (const playerId of player_ids) {

            await client.query(
                `
                INSERT INTO team_members
                (
                    registration_id,
                    user_id,
                    role
                )
                VALUES ($1,$2,$3)
                `,
                [
                    registrationId,
                    playerId,
                    "player"
                ]
            );

        }

        await client.query("COMMIT");

        return res.status(201).json({
            success: true,
            message: "Registration Successful"
        });

    } catch (error) {

        await client.query("ROLLBACK");

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    } finally {

        client.release();

    }

};


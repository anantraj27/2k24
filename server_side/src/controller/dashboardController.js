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

    const userId = 15; // ya token se

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


const query =   `
            SELECT
                se.id AS scheduled_id,
                e.name,
                e.id AS event_id,
                se.event_date,
                se.event_time,
                teamA.team_name AS team_a,
                teamB.team_name AS team_b,
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
            `

export const  geteventByEventId= async(req,res)=>{
     const id  =Number(req.params.id) ;

 let result ;

    try {
        let sql = query;
        result = await db.query(
             sql += `WHERE se.status = $1;
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
        let sql = query;
        result = await db.query(
             sql += `WHERE se.status = $1;
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





import { count, error } from "console";
import db from "../configuration/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { io } from "../app.js";
import { appError } from "../utility/appError.js";
// import { dirname } from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const dashboardPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../../public/admin.html"));
};

export const dashboardData = async (req, res,next) => {
  let result;

  try {
    result = await db.query(
      `SELECT  
        
           COUNT(*) AS total_user  ,
           COUNT(*) FILTER (WHERE status = 'pending' ) AS pending_user,
           COUNT(*) FILTER (WHERE status = 'approved' ) AS approved_user,
           COUNT(*) FILTER (WHERE status = 'rejected' ) AS rejected_user
           
        FROM users
         `,
    );
    return res.status(200).json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

export const event = async (req, res, next) => {

    try {

        const { category, all } = req.query;

        let result;

        // 👇 Registration page ke liye
        if (all === "true") {

            result = await db.query(`
                SELECT id, name
                FROM events
                ORDER BY name
            `);

        }

        // Team Events
        else if (category === "1") {

            result = await db.query(
                `
                SELECT *
                FROM events
                WHERE type IN ($1,$2)
                `,
                ["team", "team/solo"]
            );

        }

        // Solo Events
        else if (category === "2") {

            result = await db.query(
                `
                SELECT *
                FROM events
                WHERE type IN ($1,$2)
                `,
                ["solo", "team/solo"]
            );

        }

        else {

            return res.status(400).json({
                success:false,
                message:"Invalid category"
            });

        }

        return res.status(200).json({
            success:true,
            data:result.rows
        });

    } catch(error){

        next(error);

    }

}



export const user = async (req, res,next) => {
  const category = req.query.category;

  let result;

  try {
    if (category === "1") {
      result = await db.query(
        `SELECT  name , email , registration_no , status FROM users
          WHERE status = $1`,
        ["pending"],
      );
    } else if (category === "2") {
      result = await db.query(
        `SELECT name , email , registration_no , status FROM users
          WHERE status = $1`,
        ["approved"],
      );
    } else if (category === "3") {
      result = await db.query(
        `SELECT name , email , registration_no , status FROM users
          WHERE status = $1`,
        ["rejected"],
      );
    } else if (category === "4") {
      result = await db.query(
        `SELECT name , email , registration_no , status FROM users`,
      );
    }

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};
export const teams = async (req, res,next) => {
  const category = req.query.category;
  console.log("category", category);
  const participation_type = category == "2" ? "solo" : "team";
 const eventId = Number(req.query["event-id"]);
  // console.log(participation_type, sport);
  let result;
  try {
    const result = await db.query(
    `
    SELECT
        er.id,
        er.event_id,
        er.participation_type,

        CASE
            WHEN er.participation_type = 'solo'
            THEN u.name
            ELSE er.team_name
        END AS name,

        u.name AS captain_name,
        er.team_name,
        er.captain_phone,
        er.captain_registration_no,
        er.gender

    FROM event_registrations er

    INNER JOIN users u
    ON er.captain_id = u.id

    WHERE er.participation_type = $1
    AND er.event_id = $2
`,
[participation_type, eventId]
);
console.log(result)
    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
   next(error);
  }
};

/// see total scheduled events ... 
/*==============================================
A single query . for scheduled_events_database
============================================ */

 const  query = 
 `
        SELECT
          se.id AS scheduled_id,
          e.name,
          e.id AS event_id,
          se.event_date,
          se.event_time,

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
          se.participation_type,

          scheduler.name AS scheduled_by

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

      LEFT JOIN users scheduler
      ON scheduler.id = se.scheduled_by
 `



export const getAllScheduledEvents =  async (rq, res,next)=>{
         
  let result ;
  let sql = query

  try {
        result = await db.query(sql);
        console.log("result",result.rows)
            return res.status(200).json({
            success: true,
            data:result.rows,
          });

  } catch (error) {
            
      next(error);
  }
 
}
        

///--------------------------------------------------------------    

export const scheduledEvent = async (req, res,next) => {
  const body = req.body;
  console.log(body);
  const scheduleDateTime = new Date(`${body.date}T${body.time}+05:30`);

  const now = new Date();

  if (scheduleDateTime <= now) {
    return res.status(400).json({
      success: false,
      message: "Schedule time must be in the future",
    });
  }
  if (Object.keys(req.body).length === 0 || Object.keys(req.body).length != 7) {
    return res.status(400).json({
      success: false,
      message: "Request body is not complete ..",
    });
  }
  if (Number(body.team_A )=== Number(body.team_B)) {
    return res.status(400).json({
      success: false,
      message: "Teams Name are same.",
    });
  }
//  checking whether(two team are of same Sports or not ...)
//  teamA id,teamB id must be match with , event_id .. 
console.log("part 1 ----------->")

console.log('verification ---->',Number(body.event_id), Number(body.team_A), Number(body.team_B))
  const verify = await db.query(
    `SELECT  *
           FROM event_registrations
           WHERE event_id = $1 AND participation_type = $4 AND id IN($2,$3)`,
    [Number(body.event_id), Number(body.team_A), Number(body.team_B), body.participation_type],
  );


  console.log("verify ---------->",verify.rows)
  if (Number(verify.rows.length) !== 2) {
    throw new  appError("Invalid team selection",400);

  }
  let result;

  try {
    /*=======================
    await db.query("BEGIN");

    we dont need it right now ...
    =========================*/
    result = await db.query(
      `INSERT INTO scheduled_events
      (
          participation_type,
          event_id,
          participant_a_id,
          participant_b_id,
          event_date,
          event_time,
          venue,
          scheduled_by
      )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        body.participation_type,
        Number(body.event_id) ,
        Number(body.team_A),
        Number(body.team_B),
        body.date,
        body.time,
        body.venue,
        req.user.id  
      ],
    );
   
    let sql = query ;
    const eventSheduled = await db.query(
          sql +`WHERE se.id = $1 `,
          [result.rows[0].id],
        );

    /*=========================
     await db.query("COMMIT");

     we dont need it right now 
    ===========================*/

    const payload = eventSheduled.rows[0];
     
    console.log("EMITTING EVENT");
    console.log("payload is ---->" , payload);

    io.emit("eventScheduled", payload);

    return res.status(200).json({
      success: true,
      data: payload,
    });
  } catch (error) {
    /*=========================
     await db.query("ROLLBACK");

     we dont need it right now 
    ===========================*/
      next(error)
  }
};
//------------------------------------------------------------------

export const editScheduledEvent = async (req, res,next) => {
  const { event_date, event_time } = req.body;

  const editDate = new Date(`${event_date}T${event_time}+05:30`);
  if (isNaN(editDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "not a valid date format",
    });
  }
  if (editDate <= new Date()) {
    throw appError("scheduled time can't be in past",400)
 
  }

  const id = req.params.id;
  try {
    const result = await db.query(
      `UPDATE scheduled_events 
                    SET event_date = $1 , event_time = $2 
                    WHERE id =$3 
                    RETURNING event_date , event_time ,id
                    `,
      [event_date, event_time, id],
    );
    io.emit("editsheduledEvent", result.rows[0]);
    return res.status(200).json({
      success: true,
      message: "successfully update",
      data: result.rows[0],
    });
  } catch (error) {
     next(error)
  }
};

export const declearWinner = async (req, res, next) => {

    const winnerId = Number(req.body.winner);
    const winnerName = req.body.winner_name;
console.log("winner", winnerName);
console.log(req.body);

    const id = req.params.id;

    try {

        const verify = await db.query(
            `
            SELECT
                participant_a_id,
                participant_b_id
            FROM scheduled_events
            WHERE id = $1
            `,
            [id]
        );

        if (verify.rows.length === 0) {
            throw new appError("Event not found", 404);
        }

        if (
            winnerId !== verify.rows[0].participant_a_id &&
            winnerId !== verify.rows[0].participant_b_id
        ) {
            throw new appError("Winner is not a participant", 400);
        }

        const result = await db.query(
            `
            UPDATE scheduled_events
            SET winner = $1
            WHERE id = $2
            RETURNING id, winner
            `,
            [winnerName, id]
        );

        io.emit("declareWinner", result.rows[0]);

        return res.status(200).json({
            success: true,
            message: "Winner declared successfully",
            data: result.rows[0]
        });

    } catch (error) {

        next(error);

    }

};

export const statusScheduledEvent = async (req, res,next) => {
  const id = Number(req.params.id);

  const { status } = req.body;

  const validStatus = ["live", "completed"];

  try {
    if (!validStatus.includes(status)) {
      throw new Error("Invalid status ..");
    }
    const result = await db.query(
      `
                UPDATE scheduled_events     
                SET status = $1 
                WHERE id = $2
                RETURNING  status , id
                `,
      [status, id],
    );
    io.emit("statusSheduledEvent", result.rows[0]);
    if (result.rows.length != 0) {
      return res.status(200).json({
        success: true,
        message: "successfully update",
        data: result.rows[0],
      });
    } else {
      throw new Error("Evnts not found .");
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};


export const deleteScheduledEvent = async (req, res,next) => {
  const id = req.params.id;

  try {
    const result = await db.query(
      `
            DELETE FROM scheduled_events
            WHERE id = $1
            RETURNING *
            `,
      [id],
    );
    io.emit("deleteScheduledEvent", "deleted");
    return res.status(200).json({
      success: true,
      message: "successfully Deleted",
      data: result.rows[0],
    });
  } catch (error) {
     next(error)
  }
};
export const checkRegistration = async (req, res, next) => {

    const eventId = Number(req.query.event_id);

    try {

        const result = await db.query(
            `
            SELECT

                er.id,

                er.team_name,

                captain.name AS captain_name,

                er.captain_phone,

                er.captain_registration_no,

                er.gender,

                STRING_AGG(
                    CASE
                        WHEN tm.role = 'captain'
                        THEN u.name || ' (Captain)'
                        ELSE u.name
                    END,
                    ', '
                    ORDER BY tm.role DESC, u.name
                ) AS players

            FROM event_registrations er

            INNER JOIN users captain
            ON captain.id = er.captain_id

            INNER JOIN team_members tm
            ON tm.registration_id = er.id

            INNER JOIN users u
            ON u.id = tm.user_id

            WHERE er.event_id = $1

            GROUP BY

                er.id,
                er.team_name,
                captain.name,
                er.captain_phone,
                er.captain_registration_no,
                er.gender

            ORDER BY er.team_name
            `,
            [eventId]
        );

        return res.status(200).json({
            success: true,
            data: result.rows
        });

    } catch (error) {

        next(error);

    }

};
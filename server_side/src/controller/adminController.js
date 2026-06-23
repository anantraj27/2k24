import { count, error } from "console";
import db from "../configuration/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { io } from "../app.js";
// import { dirname } from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const dashboardPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../../public/admin.html"));
};

export const dashboardData = async (req, res) => {
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
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const event = async (req, res) => {



  const category = req.query.category;

  let result;

  try {
    if (category === "2") {
      result = await db.query(
        `SELECT * FROM events
          WHERE type IN ($1 ,$2)`,
        ["solo", "team/solo"],
      );
    } else if (category === "1") {
      result = await db.query(
        `SELECT * FROM events
          WHERE type IN ($1 ,$2)`,
        ["team", "team/solo"],
      );
    }

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const user = async (req, res) => {
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
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const teams = async (req, res) => {
  const category = req.query.category;
  console.log("category", category);
  const participation_type = category == "2" ? "solo" : "team";
  const sport = Number(req.query.sport);
  console.log(participation_type, sport);
  let result;
  try {
    result = await db.query(
      `SELECT * FROM event_registrations
          WHERE participation_type = $1 AND event_id = $2`,
      [participation_type, sport],
    );
    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
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
                e.id AS event_id,
                e.name,
                se.event_date,
                se.event_time,
                teamA.team_name AS team_a,
                se.participant_a_id As team_a_id ,
                teamB.team_name AS team_b,
                se.participant_b_id As team_b_id ,
                se.venue,
                se.status,
                se.winner,
                se.participation_type AS participation_type

            FROM scheduled_events se
            INNER JOIN events e
            ON se.event_id = e.id

            INNER JOIN event_registrations teamA
            ON se.participant_a_id = teamA.id

            INNER JOIN event_registrations teamB
            ON se.participant_b_id = teamB.id

            `



export const getAllScheduledEvents =  async (rq, res)=>{
         
  let result ;
  let sql = query

  try {
        result = await db.query(sql);
            return res.status(200).json({
            success: true,
            data:result.rows,
          });

  } catch (error) {
            result = await db.query(sql);
            return res.status(500).json({
            success:false,
            data:null,
          });
  }
 
}
        

///--------------------------------------------------------------    

export const scheduledEvent = async (req, res) => {
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
    return res.status(400).json({
      success: false,
      message: "Invalid team selection",
    });
  }
  let result;

  try {
    /*=======================
    await db.query("BEGIN");

    we dont need it right now ...
    =========================*/
    result = await db.query(
      `INSERT INTO   scheduled_events
          (
          participation_type,
          event_id,
          participant_a_id,
          participant_b_id,
          event_date,
          event_time,
          venue
          )
          VALUES($1,$2,$3,$4,$5,$6,$7)
          RETURNING *`,
      [
        body.participation_type,
        Number(body.event_id) ,
        Number(body.team_A),
        Number(body.team_B),
        body.date,
        body.time,
        body.venue,
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
      return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
//------------------------------------------------------------------

export const editScheduledEvent = async (req, res) => {
  const { event_date, event_time } = req.body;

  const editDate = new Date(`${event_date}T${event_time}+05:30`);
  if (isNaN(editDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "not a valid date format",
    });
  }
  if (editDate <= new Date()) {
    return res.status(400).json({
      success: false,
      message: "scheduled time can't be in past",
      data: null,
    });
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
    return res.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const declearWinner = async (req, res) => {
  const winnerId = Number(req.body.winner) || 0;

  const id = req.params.id;
  console.log("id -->", id);

  try {
    const verify = await db.query(
      ` SELECT
            participant_a_id,
            participant_b_id
            FROM scheduled_events
            WHERE id = $1`,
      [id],
    );
    if (
      winnerId !== verify.rows[0].participant_a_id &&
      winnerId !== verify.rows[0].participant_b_id
    ) {
      throw new Error("Winner is not a participant");
    }
    const result = await db.query(
      `UPDATE scheduled_events 
                
               SET winner = $1 
               WHERE id = $2
               RETURNING  winner , id
               `,
      [winnerId, id],
    );
    if (result.rows.length == 0) {
      throw new Error("Event not found");
    }
    console.log("result", result.rows[0].winner, result.rows[0]);
    const winner = await db.query(
      `
           SELECT team_name,id 
           FROM event_registrations
           WHERE id = $1 
           
           `,
      [result.rows[0].winner],
    );
    if (winner.rows.length == 0) {
      throw new Error("Event not found");
    }
    console.log("winner", winner.rows[0]);
    io.emit("declareWinner", winner.rows[0]);
    return res.status(200).json({
      success: true,
      message: "successfully update",
      data: winner.rows[0],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const statusScheduledEvent = async (req, res) => {
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
    io.emit(statusSheduledEvent, result.rows[0]);
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


export const deleteScheduledEvent = async (req, res) => {
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
    return res.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

import db from "../configuration/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { io } from "../app.js";
import { moderateConfession } from "../utility/moderator.js";
export const getConfessions = async (req, res) => {

    try {

        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = 10;
        const offset = (page - 1) * limit;

        const totalResult = await db.query(
            `
            SELECT COUNT(*)
            FROM confessions
            WHERE is_hidden = FALSE
            `
        );

        const totalConfessions = Number(totalResult.rows[0].count);

        const result = await db.query(
            `
            SELECT
                id,
                message,
                avatar,
                love_count,
                fire_count,
                laugh_count,
                created_at
            FROM confessions
            WHERE is_hidden = FALSE
            ORDER BY created_at DESC
            LIMIT $1
            OFFSET $2
            `,
            [limit, offset]
        );

        return res.status(200).json({

            success: true,

            message: "Confessions fetched successfully.",

            currentPage: page,

            totalPages: Math.ceil(totalConfessions / limit),

            totalConfessions,

            data: result.rows

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};
export const addConfession = async (req, res) => {

    try {

        const { message, avatar } = req.body;

        if (!message || message.trim().length < 50) {

            return res.status(400).json({
                success: false,
                message: "Confession must contain at least 50 characters."
            });

        }

        if (message.length > 250) {

            return res.status(400).json({
                success: false,
                message: "Maximum 250 characters allowed."
            });

        }
        const moderation = await moderateConfession(message);
        if (!moderation.allowed) {

    return res.status(400).json({

        success: false,

        message: moderation.reason

    });

}

        const result = await db.query(

            `
            INSERT INTO confessions
            (
                message,
                avatar
            )

            VALUES($1,$2)

            RETURNING
                id,
                message,
                avatar,
                love_count,
                fire_count,
                laugh_count,
                created_at
            `,
            [
                message.trim(),
                avatar
            ]

        );

        return res.status(201).json({

            success: true,

            message: "Confession posted successfully.",

            data: result.rows[0]

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};
export const reactConfession = async (req, res) => {

    const client = await db.connect();

    try {

        const { id } = req.params;

        const { reaction, sessionId } = req.body;

        const reactions = {

            love: "love_count",

            fire: "fire_count",

            laugh: "laugh_count"

        };

        if (!reactions[reaction]) {

            return res.status(400).json({

                success: false,

                message: "Invalid reaction."

            });

        }

        await client.query("BEGIN");

        const alreadyReacted = await client.query(

            `
            SELECT id

            FROM confession_reactions

            WHERE confession_id=$1

            AND session_id=$2
            `,
            [
                id,
                sessionId
            ]

        );

        if (alreadyReacted.rows.length > 0) {

            await client.query("ROLLBACK");

            return res.status(409).json({

                success: false,

                message: "You already reacted."

            });

        }

        await client.query(

            `
            INSERT INTO confession_reactions
            (
                confession_id,
                session_id,
                reaction_type
            )

            VALUES($1,$2,$3)
            `,
            [
                id,
                sessionId,
                reaction
            ]

        );

        const updated = await client.query(

            `
            UPDATE confessions

            SET ${reactions[reaction]} = ${reactions[reaction]} + 1

            WHERE id=$1

            RETURNING
                id,
                love_count,
                fire_count,
                laugh_count
            `,
            [id]

        );

        await client.query("COMMIT");

        return res.status(200).json({

            success: true,

            message: "Reaction added.",

            data: updated.rows[0]

        });

    } catch (error) {

        await client.query("ROLLBACK");

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    } finally {

        client.release();

    }

};
export const reportConfession = async (req, res) => {

    const client = await db.connect();

    try{

        const { id } = req.params;

        const { sessionId } = req.body;

        await client.query("BEGIN");

        const check = await client.query(

            `
            SELECT id

            FROM confession_reports

            WHERE confession_id=$1

            AND session_id=$2
            `,

            [
                id,
                sessionId
            ]

        );

        if(check.rows.length){

            await client.query("ROLLBACK");

            return res.status(409).json({

                success:false,

                message:"You already reported this confession."

            });

        }

        await client.query(

            `
            INSERT INTO confession_reports
            (
                confession_id,
                session_id
            )

            VALUES($1,$2)
            `,

            [
                id,
                sessionId
            ]

        );

        const updated = await client.query(

            `
            UPDATE confessions

            SET report_count = report_count + 1

            WHERE id=$1

            RETURNING report_count
            `,

            [
                id
            ]

        );

        const reportCount =
            updated.rows[0].report_count;

        if(reportCount >= 5){

            await client.query(

                `
                UPDATE confessions

                SET is_hidden = TRUE

                WHERE id=$1
                `,

                [
                    id
                ]

            );

        }

        await client.query("COMMIT");

        return res.json({

            success:true,

            message:"Report submitted."

        });

    }catch(error){

        await client.query("ROLLBACK");

        console.error(error);

        return res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });

    }finally{

        client.release();

    }

};
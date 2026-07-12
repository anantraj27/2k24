import db from "../configuration/db.js";

export const checkEventPermission = async (req, res, next) => {
    try {
                if (req.user.role === "super_admin") {
            return next();
        }

        let eventId;

        // POST /scheduled-events
        if (req.body.event_id) {
            eventId = Number(req.body.event_id);
        }

        // GET /teams?event-id=1
        else if (req.query["event-id"]) {
            eventId = Number(req.query["event-id"]);
        }

        // GET /check-registration?event_id=1
        else if (req.query.event_id) {
            eventId = Number(req.query.event_id);
        }

        // PATCH / DELETE /scheduled-events/:id
        else if (req.params.id) {

            const result = await db.query(
                `
                SELECT event_id
                FROM scheduled_events
                WHERE id = $1
                `,
                [Number(req.params.id)]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Scheduled event not found"
                });
            }

            eventId = result.rows[0].event_id;
        }

        else {
            return res.status(400).json({
                success: false,
                message: "Event id not found"
            });
        }

        const permission = await db.query(
            `
            SELECT 1
            FROM event_admins
            WHERE admin_id = $1
            AND event_id = $2
            `,
            [req.user.id, eventId]
        );

        if (permission.rows.length === 0) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        next();

    } catch (error) {
        next(error);
    }
};
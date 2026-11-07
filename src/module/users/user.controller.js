

import {updateNoteService,deleteAllNotesService,aggregateNotesService,getNotesWithUserService,getNoteByContentService,getNoteByIdService,paginateSortNotesService,deleteNoteService,updateAllNotesService,replaceNoteService , createNoteService, deleteUserService, getbyid, loginservices, signupService, updateUserService } from "./user.services.js"

import { Router } from "express";

const router = Router();



router.post("/singup", async (req, res) => {
    const body = req.body

    const user = await signupService(body)
    res.status(201).json({
        data: {
            user
        }
    })
})


router.post("/login", async (req, res) => {
    const body = req.body
    const user = await loginservices(body)
    res.status(201).json({
        data: {
            user
        }
    })
})

router.post("/login", async (req, res) => {
    const body = req.body
    const user = await loginservices(body)
    res.status(201).json({
        data: {
            user
        }
    })
})

router.patch("/update", async (req, res) => {
    const { id } = req.query;

    const user = await updateUserService(id, req.body);

    res.status(200).json({ data: user });
});


router.delete("/delete", async (req, res) => {
    const { id } = req.query;
    const user = await deleteUserService(id);

    res.status(200).json({ data: user });
});

router.delete("/getbyid", async (req, res) => {
    const { id } = req.query;
    const user = await getbyid(id);

    res.status(200).json({ data: user });
});


router.post("/notes", async (req, res) => {
    const body = req.body;
    const { id } = req.query;

    const note = await createNoteService(body, id);

    res.status(201).json({
        data: {
            note
        }
    });
});

router.patch("/notes/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const { id } = req.query;
    const body = req.body;

    const note = await updateNoteService(noteId, id, body);

    res.status(200).json({
        data: {
            note
        }
    });
});


router.put("/notes/replace/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const { id } = req.query;
    const body = req.body;

    const note = await replaceNoteService(noteId, id, body);

    res.status(200).json({
        data: {
            note
        }
    });
});

router.patch("/notes/all", async (req, res) => {
    const { id } = req.query;
    const { title } = req.body;

    const notes = await updateAllNotesService(id, title);

    res.status(200).json({
        data: {
            notes
        }
    });
});



router.delete("/notes/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const { id } = req.query;

    const note = await deleteNoteService(noteId, id);

    res.status(200).json({
        data: {
            note
        }
    });
});


router.get("/notes/paginate-sort", async (req, res) => {
    const { id, page, limit } = req.query;

    const notes = await paginateSortNotesService(
        id,
        Number(page) || 1,
        Number(limit) || 10
    );

    res.status(200).json({
        data: {
            notes
        }
    });
});


router.get("/notes/:id", async (req, res) => {
    const { id } = req.query;
    const noteId = req.params.id;

    const note = await getNoteByIdService(noteId, id);

    res.status(200).json({
        data: {
            note
        }
    });
});



router.get("/notes/note-by-content", async (req, res) => {
    const { id, content } = req.query;

    const note = await getNoteByContentService(content, id);

    res.status(200).json({
        data: {
            note
        }
    });
});





router.get("/notes/note-with-user", async (req, res) => {
    const { id } = req.query;

    const notes = await getNotesWithUserService(id);

    res.status(200).json({
        data: {
            notes
        }
    });
});



router.get("/notes/aggregate", async (req, res) => {
    const { id, title } = req.query;

    const notes = await aggregateNotesService(id, title);

    res.status(200).json({
        data: {
            notes
        }
    });
});



router.delete("/notes/all", async (req, res) => {
    const { id } = req.query;

    const notes = await deleteAllNotesService(id);

    res.status(200).json({
        data: {
            notes
        }
    });
});

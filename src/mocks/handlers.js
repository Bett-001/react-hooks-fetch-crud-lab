import { rest } from "msw";

const baseURL = "http://localhost:4000";

export const handlers = [
  // GET /questions
  rest.get(`${baseURL}/questions`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          prompt: "lorem testum 1",
          answers: ["A", "B", "C", "D"],
          correctIndex: 0,
        },
        {
          id: 2,
          prompt: "lorem testum 2",
          answers: ["X", "Y", "Z", "W"],
          correctIndex: 1,
        },
      ])
    );
  }),

  // POST /questions
  rest.post(`${baseURL}/questions`, async (req, res, ctx) => {
    const newQuestion = await req.json();
    return res(ctx.status(201), ctx.json(newQuestion));
  }),

  // PATCH /questions/:id
  rest.patch(`${baseURL}/questions/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const updates = await req.json();
    return res(ctx.status(200), ctx.json({ id: Number(id), ...updates }));
  }),

  // DELETE /questions/:id
  rest.delete(`${baseURL}/questions/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

import express, { request } from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
   res.send('Hello from the server package!');
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the API!' });
});

let lastResponseId: string | null = null;

app.post('/api/chat', express.json(), async (req: Request, res: Response) => {
   const { prompt } = req.body;
   if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
   }

   try {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 100,
         previous_response_id: lastResponseId || undefined,
      });

      lastResponseId = response.id;

      res.json({ message: response.output_text });
   } catch (error) {
      console.error('Error generating text:', error);
      res.status(500).json({ error: 'Error generating text' });
   }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});

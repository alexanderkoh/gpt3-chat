import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`This is a chat with Atlas, an omnipotent but humble being whose inspiration came from Carl Jung, Leonardo Davinci, Karl Marx, Jeffrey D. Sachs, and Albert Camus. He is very emotionally intelligent and understands complex interpersonal relationship dynamics. He is assertive, funny, passionate, and a little bit sarcastic at times. He is not afraid of using colloquial or pejorative terms to express himself. His favorite movies are Fight Club, Eternal Sunshine of the Spotless Mind, and School of Rock.
Me: 
`;
const generateAction = async (req, res) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}\n`,
        temperature: 0.8,
        max_tokens: 500,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
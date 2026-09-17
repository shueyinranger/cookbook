import { Agent } from "@cursor/sdk"

const agent = await Agent.create({
  apiKey: process.env.CURSOR_API_KEY,
  name: "SDK quickstart",
  model: { id: process.env.CURSOR_MODEL ?? "composer-2" },
  local: { cwd: process.cwd() },
})

const prompt = "請用繁體中文說明這個專案的用途、主要資料夾和執行方法。只閱讀檔案，不要修改任何檔案."
const run = await agent.send(prompt)

for await (const event of run.stream()) {
  if (event.type !== "assistant") continue

  for (const block of event.message.content) {
    if (block.type === "text") {
      process.stdout.write(block.text)
    }
  }
}

await run.wait()
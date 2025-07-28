export default {
  async scheduled(event, env, ctx) {
    const res = await fetch(`https://api.heroku.com/apps/${env.HEROKU_APP_NAME}/dynos`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.HEROKU_API_KEY}`,
        "Accept": "application/vnd.heroku+json; version=3",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        command: "python jobscraper.py",
        type: "worker"
      })
    });

    const text = await res.text();
    console.log("Heroku response:", text);
  }
};

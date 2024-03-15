import { useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'

function App() {

  const [status, setStatus] = useState("")
  const [input, setInput] = useState("")

  async function getDownload(url) {
    await setStatus("Descargando...")
    await invoke("download", {url})
    setStatus("descargado")
  }

  return (
    <main>
      <div>
        <h1 className="text-center text-5xl">GVD</h1>
        <p className="text-center text-2xl">Global Video Downloader</p>
      </div>

      <form
        className="flex justify-center  my-32"
        onSubmit={(e) => {
          e.preventDefault();
          getDownload(input);
        }}
      >
        <input className="border-4 border-cyan-300 w-[400px]" onChange={(e) => setInput(e.currentTarget.value)}/>
        <button className="border-4 border-cyan-300 w-48" type="submit">Download</button>
      </form>
      <p>{status}</p>
    </main>
  )
}

export default App;

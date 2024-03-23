import { useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'
import { TERipple } from "tw-elements-react";

function App() {

  const [dMessage, setDMessage] = useState("")
  const [formatState, setFormat] = useState(false)
  const [finishState, setFinishState] = useState(false)
  const [downloadingState, setDownloadingState] = useState(false)
  const [input, setInput] = useState("")

  async function getDownload(url) {
    await setDownloadingState(true)
    await setFinishState(false)
    await setDMessage("Downloading...")
    await invoke("download", {url, formatState})
    setDownloadingState(false)
    setFinishState(true)
    setDMessage("Succesful Download")
  }

  function getFormat() {
    setFormat(prev => !prev)
  }

  return (
    <main className="text-white">

      <div>
        <h1 className="text-center text-5xl mt-12 font-Varela">Youtube Video Downloader</h1>
      </div>
      <div className="flex justify-center items-center">
        <span class="[&>svg]:h-24 [&>svg]:w-24 [&>svg]:fill-[#ff0000]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
            </svg>
          </span>
      </div>
      <form
        className="flex justify-center mt-12 mb-12"
        onSubmit={(e) => {
          e.preventDefault();
          getDownload(input);
        }}>
        <div className="group w-24 h-12 mr-5 flex items-center justify-center font-bold border-2 border-sky-600 rounded-xl text-sky-500 hover:bg-sky-600 active:bg-sky-700 active:shadow-sky-700 active:border-sky-700 hover:text-white hover:drop-shadow-md hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] hover:shadow-sky-600 transition-all ease-in-out duration-500 cursor-pointer" data-twe-ripple-centered="true"  onClick={() => getFormat()}>
          <p className="bg-transparent text-sky-500 font-bold select-none ease-in-out duration-150 group-hover:text-white">{formatState ? "MP3" : "MP4"}</p>
        </div>
        <input className=" border-b-2 w-[400px] border-white outline-none focus:border-b-red-600 duration-300 focus:ease-out  " onChange={(e) => setInput(e.currentTarget.value)} placeholder="Video URL"/>
        <button className=" font-bold border-2 border-red-600 w-28 h-12 mx-5 rounded-xl text-red-500 hover:bg-red-600 hover:text-white hover:drop-shadow-md hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] hover:shadow-red-600 ease-in-out duration-500" type="submit">Download</button>
      </form>

      <div className={`flex justify-center items-center`}>
          <svg aria-hidden="true" className={`w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 ${downloadingState ? "opacity-100" : "opacity-0"}`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <p className="mx-4 font-bold text-xl">{dMessage}</p>
      </div>
    </main>
  )
}

export default App;



<button
  type="button"
  class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
  Button
</button>
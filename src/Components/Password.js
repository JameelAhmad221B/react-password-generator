import { useCallback, useEffect, useState } from "react";

export default function Password() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("copy");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_{}[]<>?/";
    for (let i = 1; i <= length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
    setButtonText("copy");
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
    return () => {
    };
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(password);
    if (buttonText === "copy") {
      setButtonText("copied");
    }
  };

  return (
    <div className="py-64">
      <div className="w-full flex justify-center items-center">
        <span className="absolute top-0 right-0 text-sm p-2 text-gray-600">
          Name: Jameel Ahmad | Roll Number: 212370053
        </span>
        <div id="parent" className="flex flex-col gap-4 w-3/4 p-8 rounded-lg shadow-lg shadow-indigo-500/40 bg-indigo-300">
          <h1>Password Generator</h1>
          <div className="flex gap-4">
            <input className="w-3/4 px-4 py-2 rounded" type="text" value={password} placeholder="password" readOnly />
            <button className="bg-indigo-500 text-white px-4 py-2 rounded" onClick={handleCopyClick}>
              {buttonText}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="range"
              className="range-slider appearance-none w-1/2 h-4 rounded-lg outline-none bg-gray-300"
              min={6}
              max={100}
              value={length}
              onChange={(e) => {
                setLength(Number(e.target.value));
              }}
            />
            <label>length: {length}</label>
            <input
              type="checkbox"
              checked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput"> Numbers</label>
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput"> Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}
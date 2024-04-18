import { useEffect, useState } from "react";

export default function HomepageComp({ data }) {
  const [runsCount, setRunsCount] = useState(data.runs);
  const [goblinsCount, setGoblinsCount] = useState(data.goblins);
  const [rbgCount, setRbgCount] = useState(data.rbgs);

  const calculateGpr = () =>
    runsCount > 0 ? (goblinsCount / runsCount).toFixed(2) : 0;
  const calculateRbgpr = () =>
    runsCount > 0 ? (rbgCount / runsCount).toFixed(2) : 0;
  const [gpr, setGpr] = useState(calculateGpr());
  const [rbgpr, setRbgpr] = useState(calculateRbgpr());

  const updateStateFromResponse = (response) => {
    if (response.ok) {
      response.json().then((data) => {
        setRunsCount(data.runs);
        setGoblinsCount(data.goblins);
        setRbgCount(data.rbgs);
        setGpr(calculateGpr());
        setRbgpr(calculateRbgpr());
      });
    }
  };

  const patchData = async (field, increment) => {
    try {
      const newValue = {
        runs: field === "runs" ? runsCount + increment : runsCount,
        goblins: field === "goblins" ? goblinsCount + increment : goblinsCount,
        rbgs: field === "rbgs" ? rbgCount + increment : rbgCount,
      };
      if (field === "rbgs") {
        newValue.goblins += increment;
      }

      const response = await fetch(
        "/api/api/trackers/661fde43096acdc8617afda9",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newValue),
        }
      );

      updateStateFromResponse(response);
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  return (
    <>
      <div className="flex w-screen justify-center mt-20">
        <h1 className="text-white font-bold text-4xl">RBG KILLS: {rbgCount}</h1>
        <img
          src="/rbg.jpg"
          alt="Rainbow goblin"
          className="ml-4 animate-bounce"
        />
      </div>
      <div className="mt-3 flex justify-center text-white">
        <button
          onClick={() => patchData("rbgs", 1)}
          className="mr-5 border-2 border-white rounded-xl p-3 text-xl"
        >
          +1 RBG
        </button>
        <button
          onClick={() => patchData("rbgs", -1)}
          className="border-2 border-white rounded-xl p-3 text-xl"
        >
          -1 RBG
        </button>
      </div>
      <div className="flex justify-around text-white mt-5">
        <div className="text-3xl">
          <h2>Goblins: {goblinsCount}</h2>
          <h2>GPR: {gpr}</h2>
          <button
            onClick={() => patchData("goblins", 1)}
            className="mt-2 mr-5 border-2 border-white rounded-xl p-3 text-xl"
          >
            +1 Goblin
          </button>
          <button
            onClick={() => patchData("goblins", -1)}
            className="border-2 border-white rounded-xl p-3 text-xl"
          >
            -1 Goblin
          </button>
          <img src="/lillian.png" alt="lillian" />
        </div>
        <img src="/wings-cosmic.jpg" alt="cosmic wings" />
        <div className="text-3xl">
          <h2>Runs: {runsCount}</h2>
          <h2>RBGPR: {rbgpr}</h2>
          <button
            onClick={() => patchData("runs", 1)}
            className="mt-2 mr-5 border-2 border-white rounded-xl p-3 text-xl"
          >
            +1 Run
          </button>
          <button
            onClick={() => patchData("runs", -1)}
            className="border-2 border-white rounded-xl p-3 text-xl"
          >
            -1 Run
          </button>
          <img src="/rbgportal.png" alt="portal" />
        </div>
      </div>
    </>
  );
}

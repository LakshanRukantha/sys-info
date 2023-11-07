document.addEventListener("DOMContentLoaded", function () {
  const terminal = document.getElementById("terminal");

  // Create a new command element with input field
  const createCommandElement = () => {
    const commandInput = document.createElement("div");
    commandInput.innerHTML = `
        <div class="flex text-sm md:text-base gap-2 my-2">
        <span class="text-red-500"
          >sysinfo:~<span class="text-green-500">$</span></span
        >
        <input
          type="text"
          id="command"
          class="bg-transparent text-slate-50 outline-none border-none w-full"
          aria-label="command"
        />
        </div>`;
    terminal.appendChild(commandInput);

    // Focus on the input field
    const inputField = commandInput.querySelector("#command");
    inputField.focus();
    inputField.addEventListener("keydown", handleCommand);
  };

  // Battery command handler
  const batteryHandler = async (outElement) => {
    navigator.getBattery().then((battery) => {
      outElement.textContent = `=#= Battery Stats =#=\n\n`; // Clear the output element
      outElement.textContent += `Battery Level: ${
        battery.level > 0.5 ? "🔋 " : "🪫 "
      }${battery.level * 100}% ${
        battery.level <= 0.2 ? "(Low battery)" : ""
      }\n`;
      outElement.textContent += `Battery Status: ${
        battery.charging ? "⚡ Charging" : "🔌 Not Charging"
      }\n`;
      outElement.textContent += `Battery Charging Time: ${
        battery.chargingTime !== Infinity
          ? `${battery.chargingTime} seconds`
          : "😢 Couldn't calculate"
      }\n`;
      outElement.textContent += `Battery Discharging Time: ${
        battery.chargingTime !== Infinity
          ? `${battery.chargingTime} seconds`
          : "😢 Couldn't calculate"
      }\n`;
    });
  };

  // Network command handler
  const networkHandler = async (outElement) => {
    const connection =
      (await navigator.connection) ||
      (await navigator.mozConnection) ||
      (await navigator.webkitConnection);

    outElement.textContent = `=#= Network Stats =#=\n\n`; // Clear the output element
    outElement.textContent += `Connection Type: ${connection.effectiveType}\n`;
    outElement.textContent += `Effective Bandwidth: ${connection.downlink} Mbps\n`;
    outElement.textContent += `Data Saver: ${
      connection.saveData ? "Active" : "Inactive"
    }\n`;
    outElement.textContent += `Round-trip Time: ${connection.rtt} ms\n`;
  };

  // Handle command input
  const handleCommand = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const commandInput = event.target;

      // Remove the input field and replace with span for preventing further input
      const commandSpan = document.createElement("span");
      commandSpan.className = "text-slate-50 text-sm md:text-base";
      commandSpan.textContent = commandInput.value;
      commandInput.replaceWith(commandSpan);

      const command = commandInput.value.trim().toLowerCase();

      // Create a new output element
      const outputElement = document.createElement("span");
      outputElement.className =
        "text-slate-50 text-sm md:text-base whitespace-break-spaces";
      terminal.appendChild(outputElement);

      // Handle different commands and update outputElement accordingly
      switch (command) {
        case "": // Empty command input
          createCommandElement();
          break;
        case "help":
          outputElement.textContent += "Available commands:\n";
          outputElement.textContent +=
            "  sysinfo: Displays system information\n";
          outputElement.textContent +=
            "  battery: Displays battery information\n";
          outputElement.textContent +=
            "  network: Displays network information\n";
          outputElement.textContent += "  clear: Clears the terminal\n";

          createCommandElement(); // Re-render the terminal
          break;
        case "sysinfo":
          outputElement.textContent += "Fetching system information...\n";
          // Get and display system information here
          createCommandElement();
          break;

        case "battery":
          outputElement.textContent += "Fetching battery information...\n";
          // Get and display battery information here
          setTimeout(async () => {
            await batteryHandler(outputElement);
            createCommandElement();
          }, 500);
          break;

        case "network":
          outputElement.textContent += "Fetching network information...\n";
          // console.log(navigator.connection);
          // Get and display network information here
          setTimeout(async () => {
            await networkHandler(outputElement);
            createCommandElement();
          }, 500);
          break;

        case "clear":
          // Remove the previous input and output
          while (terminal.firstChild) {
            terminal.removeChild(terminal.firstChild);
          }
          createCommandElement(); // Re-render the terminal
          break;

        default:
          outputElement.className =
            "text-red-500 mt-2 text-sm md:text-base whitespace-break-spaces";
          outputElement.textContent +=
            "❌ Unknown command. Type 'help' for assistance.\n";
          createCommandElement(); // Re-render the terminal
          break;
      }
    }
  };

  // Initial terminal rendering
  createCommandElement();
});

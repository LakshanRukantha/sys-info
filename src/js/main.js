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

  // Handle command input
  const handleCommand = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const commandInput = event.target;
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
          createCommandElement();
          break;

        case "network":
          outputElement.textContent += "Fetching network information...\n";
          // Get and display network information here
          createCommandElement();
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

var args = ["start"];
var opts = { stdio: "inherit", cwd: "client", shell: true };

require("child_process").spawn("npm", args, opts);

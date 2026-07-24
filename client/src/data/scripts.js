export const SCRIPTS = {
    login: [
        { text: "$ openship deploy ./dist", kind: "cmd" },
        { text: "==> Reading manifest... 12 files found", kind: "" },
        { text: "==> Buildinng static bundle", kind: "" },
        { text: "==> Assigning subdomain", kind: "" },
        { text: "==> Shipped to preview.bitsathy.in", kind: "ok" }
    ],
    register: [
        { text: "$ openship init", kind: "cmd" },
        { text: "==> Creating your dock...", kind: "" },
        { text: "==> Provisoning subdomain", kind: "" },
        { text: "==> Generating deploy key", kind: "" },
        { text: "==> Dock ready. Awaiting first shipment.", kind: "ok" },
    ],
}
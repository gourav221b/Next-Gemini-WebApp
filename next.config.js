const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    fallbacks: {
        // Failed page requests fallback to this.
        document: "/offline",
    },


});

module.exports = withPWA({
    reactStrictMode: true,

});

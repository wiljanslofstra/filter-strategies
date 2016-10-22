var context = require.context('./src/javascript', true, /-test\.js$/);
context.keys().forEach(context);

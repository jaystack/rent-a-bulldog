import { server }  from './app';


const serverConnection = server.listen(process.env.PORT || 3000, () => {
    console.log(`Ready on`, serverConnection.address());
});

export {}
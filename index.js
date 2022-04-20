const { MongoClient, ServerApiVersion } = require('mongodb');

async function main(){
    const uri = "mongodb+srv://AlexJoo:NpULT6BmqIoTPm4O@blogcluster.e2rhs.mongodb.net/BlogDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    
    try{
        await client.connect();
    }
    catch (e){
        console.error(e);
    }
    finally{
        await client.close();
    }
}

main().catch(console.error);
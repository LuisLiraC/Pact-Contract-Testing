fn main() {
    println!("Hello, world!");
}


use pact_consumer::prelude::*;
use pact_consumer::*;
use std::env;

#[tokio::test]
async fn hello_world() {
    env::set_var("PACT_OUTPUT_DIR", "../../pacts");
    let verifier = PactBuilder::new("Rust-HelloWorld", "Server")
        .interaction("Hello World Request", "", |mut i| {
            i.request.path("/");
            i.response
                .content_type("application/json")
                .json_body(json_pattern!({
                    "Hello": "World"
                }));
            i
        }).start_mock_server(None);

    let mock_server = verifier.path("/");
    reqwest::get(mock_server).await.unwrap();
}

package com.example.area

fun sendPostRequest(userName:String, password:String) {

    var reqParam = URLEncoder.encode("username", "UTF-8") + "=" + URLEncoder.encode(userName, "UTF-8")
    reqParam += "&" + URLEncoder.encode("password", "UTF-8") + "=" + URLEncoder.encode(password, "UTF-8")
    val mURL = URL("<Your API Link>")

    with(mURL.openConnection() as HttpURLConnection) {
        // optional default is GET
        requestMethod = "POST"

        val wr = OutputStreamWriter(getOutputStream());
        wr.write(reqParam);
        wr.flush();

        println("URL : $url")
        println("Response Code : $responseCode")

        BufferedReader(InputStreamReader(inputStream)).use {
            val response = StringBuffer()

            var inputLine = it.readLine()
            while (inputLine != null) {
                response.append(inputLine)
                inputLine = it.readLine()
            }
            it.close()
            println("Response : $response")
        }
    }
}


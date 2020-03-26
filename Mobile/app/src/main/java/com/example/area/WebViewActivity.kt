package com.example.area

import android.content.Intent
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class WebViewActivity : AppCompatActivity() {
    private var myWebView : WebView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.web_view)
        myWebView = findViewById<WebView>(R.id.webView)
        myWebView!!.settings.javaScriptEnabled = true
        myWebView!!.loadUrl(intent.getStringExtra("url"))
        myWebView!!.webViewClient = object: WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView, responseUrl: String): Boolean {
                if (responseUrl.contains("https://www.exemple.com")) {
                    val intent = Intent(this@WebViewActivity, navBar::class.java)
                    intent.putExtra("baseUrl", intent.getStringExtra("baseUrl"))
                    intent.putExtra("token", intent.getStringExtra("token"))
                    startActivity(intent)
                } else {
                    myWebView!!.loadUrl(responseUrl)
                }
                return true
            }
        }
    }
}
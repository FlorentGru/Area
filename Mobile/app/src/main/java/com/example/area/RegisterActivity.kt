package com.example.area

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_register.*
import org.json.JSONObject

class RegisterActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)


        registerBtn.setOnClickListener {
            val ipString = ipText.text.toString()
            val register = "/user/register"
            val url = "$ipString$register"

            val jsonobj = JSONObject()
            jsonobj.put("email",etadress.text)
            jsonobj.put("name",etname.text)
            jsonobj.put("password",etpassword.text)

            val que = Volley.newRequestQueue(this)
            val req = JsonObjectRequest(
                Request.Method.POST,url,jsonobj,
                Response.Listener {
                        response ->
                    Toast.makeText(this, response["success"].toString(), Toast.LENGTH_SHORT).show()

                }, Response.ErrorListener {
                })
            que.add(req)
        }

        tvlogin.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }
    }
}
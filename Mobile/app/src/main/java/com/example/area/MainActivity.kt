package com.example.area

import android.animation.Animator
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.CountDownTimer
import android.view.View
import android.view.View.VISIBLE
import android.widget.Toast
import androidx.core.content.ContextCompat
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import kotlinx.android.synthetic.main.activity_main.*
import com.android.volley.toolbox.Volley
import org.json.JSONObject

class MainActivity : AppCompatActivity()
{
    lateinit var _ipAddress : String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        signUp.setOnClickListener {
            Toast.makeText(this@MainActivity, "Registering", Toast.LENGTH_SHORT).show()
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }
        val jsonobj = JSONObject()

        loginButton.setOnClickListener {
            _ipAddress = ipEditText.text.toString()
            val login = "/auth/login"
            val url = "$_ipAddress$login"

            val giveBaseUrl = JsonObjectRequest(
                Request.Method.PUT,_ipAddress + "/config/address?address=" + _ipAddress,null,
            Response.Listener{
            }, Response.ErrorListener {
                })
            jsonobj.put("email",emailEditText.text)
            jsonobj.put("password",passwordEditText.text)

            val que = Volley.newRequestQueue(this@MainActivity)
            val req = JsonObjectRequest(
                Request.Method.POST,url,jsonobj,
                    Response.Listener {
                        response ->
                        val jsonObj : JSONObject = JSONObject(response.toString())
                        val token = jsonObj.get("token").toString()
                        Toast.makeText(this, "Success", Toast.LENGTH_SHORT).show()
                        val intent = Intent(this, NavBar::class.java)
                        intent.putExtra("token", token)
                        intent.putExtra("baseUrl", _ipAddress)
                        startActivity(intent)

                    },Response.ErrorListener {
                    Toast.makeText(this, "Error", Toast.LENGTH_SHORT).show()
                })
            que.add(giveBaseUrl)
            que.add(req)
        }


        object : CountDownTimer(2000, 1000) {
            override fun onFinish() {
                bookITextView.visibility = View.GONE
                loadingProgressBar.visibility = View.GONE
                rootView.setBackgroundColor(ContextCompat.getColor(this@MainActivity, R.color.colorSplashText))
                bookIconImageView.setImageResource(R.drawable.background_color_book)
                startAnimation()
            }
            override fun onTick(p0: Long) {}
        }.start()
    }

    private fun startAnimation() {
        bookIconImageView.animate().apply {
            x(50f)
            y(100f)
            duration = 1000
        }.setListener(object : Animator.AnimatorListener {
            override fun onAnimationRepeat(p0: Animator?) {

            }

            override fun onAnimationEnd(p0: Animator?) {
                afterAnimationView.visibility = VISIBLE
            }

            override fun onAnimationCancel(p0: Animator?) {

            }

            override fun onAnimationStart(p0: Animator?) {

            }
        })
    }
}

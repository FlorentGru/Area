package com.example.area

import android.animation.Animator
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.CountDownTimer
import android.view.View
import android.view.View.VISIBLE
import android.widget.EditText
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
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val ipAddress = findViewById<EditText>(R.id.ipEditText)
        val url = ipAddress.text.toString()
        val email = findViewById<EditText>(R.id.emailEditText)
        val password = findViewById<EditText>(R.id.passwordEditText)

        signUp.setOnClickListener {
            Toast.makeText(this@MainActivity, "Registering", Toast.LENGTH_SHORT).show()
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }

        val jsonobj = JSONObject()

        loginButton.setOnClickListener {
            jsonobj.put("email",emailEditText.text)
            jsonobj.put("password",passwordEditText.text)

            val que = Volley.newRequestQueue(this@MainActivity)
            val req = JsonObjectRequest(
                Request.Method.POST,url,jsonobj,
                    Response.Listener {
                        response ->
                        Toast.makeText(this, response["success"].toString(), Toast.LENGTH_SHORT).show()

                    },Response.ErrorListener {
                    Toast.makeText(this, "Something went wrong", Toast.LENGTH_SHORT).show()
                })
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

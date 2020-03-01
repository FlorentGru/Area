package com.example.area.view.networkLocation

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.example.area.R
import com.example.area.WebViewActivity
import com.example.area.navBar
import kotlinx.android.synthetic.main.config_serveur.*

/**
 * A simple [Fragment] subclass.
 */
class NetworkFragment : Fragment() {
    private lateinit var _baseUrl :String
    private var _view : View? = null
    private lateinit var _currentlNl: TextView
    private lateinit var _buttonOk : Button

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val que = Volley.newRequestQueue(activity)
        _view = inflater.inflate(R.layout.config_serveur, container, false)
        _baseUrl = activity?.intent?.getStringExtra("baseUrl")!!
        _currentlNl = _view!!.findViewById(R.id.currentNl)
        _buttonOk = _view!!.findViewById(R.id.updateNL)
        _currentlNl.text = "Current network location : " + _baseUrl
        _buttonOk.setOnClickListener() {
            if (NewNl.text != null) {
                Toast.makeText(activity, NewNl.text, Toast.LENGTH_SHORT)
                val giveBaseUrl = JsonObjectRequest(
                    Request.Method.PUT,
                    NewNl.text.toString() + "/config/address?address=" + NewNl.text,
                    null,
                    Response.Listener { reponse ->
                        _currentlNl.text = "Current network location : " + NewNl.text
                    },
                    Response.ErrorListener { reponse ->
                        Toast.makeText(activity, "Something went wrong", Toast.LENGTH_SHORT).show()
                    })
                que.add(giveBaseUrl)
            }
        }
        return _view
    }
}

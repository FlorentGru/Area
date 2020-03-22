package com.example.area.view.gesture_area

import android.graphics.Color
import android.os.Bundle
import android.util.Log
import android.util.TypedValue
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.core.view.isVisible
import androidx.core.view.marginTop
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import com.android.volley.toolbox.JsonObjectRequest
import com.example.area.R
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.Volley
import com.example.area.navBar
import com.google.gson.JsonObject
import org.json.JSONObject
import org.json.JSONArray

class Gesture_areaFragment : Fragment() {

    private var _view: View? = null
    private val  _baseUrl = navBar.getB() + "/"
    private val  _token = navBar.getT()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _view = inflater.inflate(R.layout.gesture_area, container, false)

        val buttonDelete = Button(activity)
        val buttonDetails = Button(activity)
        val singleAction = ArrayList<String>()
        val listAction = ArrayList<ArrayList<String>>()

        val linearLayout = _view!!.findViewById<LinearLayout>(R.id.firstLayout)
        buttonDelete.text = "Delete"
        buttonDetails.text = "Details"
        buttonDetails.layoutParams = ConstraintLayout.LayoutParams(ConstraintLayout.LayoutParams.WRAP_CONTENT, ConstraintLayout.LayoutParams.WRAP_CONTENT)
        buttonDelete.layoutParams = ConstraintLayout.LayoutParams(ConstraintLayout.LayoutParams.WRAP_CONTENT, ConstraintLayout.LayoutParams.WRAP_CONTENT)
        buttonDelete.setBackgroundColor(Color.RED)
        buttonDelete.setTextColor(Color.BLACK)
        buttonDetails.setBackgroundColor(Color.GREEN)
        buttonDetails.setTextColor(Color.BLACK)

        val que = Volley.newRequestQueue(activity)
        val giveAction = object : JsonObjectRequest(
            Request.Method.GET,
            _baseUrl + "user/areas",
            null,
            Response.Listener{
                response->
                val jsonObj = JSONObject(response.toString())
                val data : JSONArray = jsonObj.getJSONArray("data")
                var i = 0;
                listAction.clear()
                while (i < data.length()) {
                    val serv = data.getJSONObject(i)
                    val id = serv.get("_id").toString()
                    val action = serv.getJSONObject("action")
                    val paramAction = action.getJSONArray("params")
                    val reaction = serv.getJSONObject("reaction")
                    val paramReaction = reaction.getJSONArray("params")
                    singleAction.add(id)
                    singleAction.add(action.get("service").toString())
                    singleAction.add(action.get("name").toString())
                    singleAction.add(paramAction.getJSONObject(i).get("name").toString())
                    singleAction.add(paramAction.getJSONObject(i).get("value").toString())
                    singleAction.add(reaction.get("service").toString())
                    singleAction.add(reaction.get("name").toString())
                    singleAction.add(paramReaction.getJSONObject(i).get("name").toString())
                    singleAction.add(paramReaction.getJSONObject(i).get("value").toString())
                    createTextAndButton(singleAction, linearLayout)
                    listAction.add(singleAction)
                    singleAction.clear()
                    i++
                }
            }, Response.ErrorListener {
            }) {
            override fun getHeaders(): MutableMap<String, String?> {
                val headers = HashMap<String, String?>()
                headers["Authorization"] = _token
                return headers
            }
        }
        que.add(giveAction)
        return _view
    }


    fun createTextAndButton(array : ArrayList<String>, linear : LinearLayout) {
        val id = array[0]
        val textView = TextView(activity)
        textView.layoutParams = RelativeLayout.LayoutParams(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        textView.marginTop
        textView.text = "Id: " + id + "\nService action: " + array[1] + " name: " + array[2] + "\nService reaction: " + array[5] + " name: " + array[6]
        textView.setTextSize(TypedValue.COMPLEX_UNIT_SP, 15f)
        textView.setTextColor(resources.getColor(R.color.whiteFont))
        linear.addView(textView)

        val button = Button(activity)
        button.layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        button.text = "DELETE"
        button.setTextColor(Color.BLACK)
        button.setBackgroundColor(Color.RED)
        button.setOnClickListener {
            val que = Volley.newRequestQueue(activity)
            val giveAction = object : JsonObjectRequest(
                Request.Method.DELETE,
                _baseUrl + "user/areas/delete?areaId=" + id,
                null,
                Response.Listener{
                }, Response.ErrorListener {
                }) {
                override fun getHeaders(): MutableMap<String, String?> {
                    val headers = HashMap<String, String?>()
                    headers["Authorization"] = _token
                    return headers
                }
            }
            que.add(giveAction)
            textView.isVisible = false
            button.isVisible = false
        }
        linear.addView(button)
    }
}
package com.example.area.view.gesture_area

import android.graphics.Color
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.fragment.app.Fragment
import com.android.volley.toolbox.JsonObjectRequest
import com.example.area.R
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.Volley
import com.example.area.navBar

class Gesture_areaFragment : Fragment() {

    private var _view: View? = null
    private val  _baseUrl = navBar.get() + "/"

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _view = inflater.inflate(R.layout.gesture_area, container, false)

        val NameArea = TextView(activity)
        val buttonDelete = Button(activity)
        val buttonDetails = Button(activity)

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
        //Récupération des AREA créer avec un GET sur le serveur
        //Une fois la récupération faite, affiage des graphs (Le nom de l'area + le boutton détail + boutton delete
        val giveAction = JsonObjectRequest(
            Request.Method.GET,_baseUrl + "area/actions",null,
            Response.Listener{
            }, Response.ErrorListener {
            })
        val giveReaction = JsonObjectRequest(
            Request.Method.GET,_baseUrl + "area/reactions",null,
            Response.Listener{
            }, Response.ErrorListener {
            })
        que.add(giveAction)
        que.add(giveReaction)
        if (giveAction == giveReaction)
            return _view
        return _view
    }
}
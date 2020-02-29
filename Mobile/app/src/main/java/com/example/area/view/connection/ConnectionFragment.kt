package com.example.area.view.connection

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.fragment.app.Fragment
import com.example.area.R
import com.example.area.presenter.ConnectionCallback

class ConnectionFragment() : Fragment() {
    private var _baseUrl= ""
    private var _connectionCallback = ConnectionCallback(this)
    private var _view : View? = null
    private lateinit var _buttonGithub :Button;
    var webViewToCall = ""


    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _view = inflater.inflate(R.layout.connection, container, false)

        if(arguments?.getString("str") != null) {
            val str = arguments?.getString("str")
            println(str)
        }
        _buttonGithub = _view!!.findViewById(R.id.github)
        _buttonGithub.setOnClickListener {
            _connectionCallback.getResponse("github")
        }
        return _view
    }

    fun getUrl() : String {
        return _baseUrl
    }
}
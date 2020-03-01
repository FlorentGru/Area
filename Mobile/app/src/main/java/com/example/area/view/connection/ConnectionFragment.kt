package com.example.area.view.connection

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.fragment.app.Fragment
import com.example.area.R
import com.example.area.presenter.ConnectionCallback
import com.example.area.WebViewActivity

class ConnectionFragment() : Fragment() {
    private var _baseUrl= ""
    private var _connectionCallback = ConnectionCallback(this)
    private var _view : View? = null
    private lateinit var _buttonGithub :Button
    private lateinit var _buttonDropbox :Button
    var _urlWebView: String=""

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        _view = inflater.inflate(R.layout.connection, container, false)
        _baseUrl = activity?.intent?.getStringExtra("baseUrl")!! + "/"
        _buttonGithub = _view!!.findViewById(R.id.github)
        _buttonGithub.setOnClickListener {
            _connectionCallback.getResponse("github", activity?.intent?.getStringExtra("token").toString())
        }
        _buttonDropbox = _view!!.findViewById(R.id.dropBox)
        _buttonDropbox.setOnClickListener {
            _connectionCallback.getResponse("dropbox", activity?.intent?.getStringExtra("token").toString())
        }
        return _view
    }

    fun getUrl() : String {
        return _baseUrl
    }

    fun callWebView() {
        val intent = Intent(activity, WebViewActivity::class.java)
        intent.putExtra("url", _urlWebView)
        intent.putExtra("baseUrl", activity?.intent?.getStringExtra("baseUrl"))
        startActivity(intent)
    }
}
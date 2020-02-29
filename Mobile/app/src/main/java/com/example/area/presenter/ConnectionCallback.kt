package com.example.area.presenter

import com.example.area.view.connection.ConnectionFragment
import com.example.area.model.ConnectionModel


class ConnectionCallback(var _view : ConnectionFragment)
{
    private var _connectedService = ArrayList<String>()
    private var _connectionModel = ConnectionModel()
    private var _urlWebView: String = ""

    fun addConnectedService(service:String) {
        _connectedService.add(service)
    }

    fun getResponse(servToConnect: String) {
        _connectionModel.getWebView(this, _view.getUrl(), servToConnect)
    }

    fun setUrl(url:String) {
        _urlWebView = url
    }

    fun updateView()
    {
        _view.webViewToCall = _urlWebView
    }
}
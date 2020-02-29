package com.example.area.model

import com.example.area.api.Requester
import com.example.area.Api.apiClient
import com.example.area.data.ApiResponse
import com.example.area.data.Service
import com.example.area.presenter.ConnectionCallback
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ConnectionModel {
    fun getWebView(connectionCallback: ConnectionCallback, base_url: String, servToConnect: String) {
        val service = apiClient.setRetrofit(base_url).create(Requester::class.java)
        val call: Call<ApiResponse<ArrayList<Service>>> = service.getWebView(servToConnect)

        call.enqueue(object : Callback<ApiResponse<ArrayList<Service>>> {
            override fun onResponse(
                call: Call<ApiResponse<ArrayList<Service>>>,
                response: Response<ApiResponse<ArrayList<Service>>>
            ) {
                val responseBody = response.body()?.data
                connectionCallback.addConnectedService(servToConnect)
                connectionCallback.setUrl(responseBody!![0].urlWebView)
                connectionCallback.updateView()
            }

            override fun onFailure(call: Call<ApiResponse<ArrayList<Service>>>, t: Throwable) {
                error(t.toString())
            }
        })
    }
}
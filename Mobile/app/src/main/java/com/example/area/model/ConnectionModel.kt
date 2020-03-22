package com.example.area.model


import com.example.area.api.apiClient
import com.example.area.api.Request
import com.example.area.data.ApiResponse
import com.example.area.data.Service
import com.example.area.presenter.ConnectionCallback
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ConnectionModel {
    fun getWebView(connectionCallback: ConnectionCallback, base_url: String?, servToConnect: String, token :String) {
        val service = apiClient.setRetrofit(base_url).create(Request::class.java)
        val call: Call<ApiResponse<ArrayList<Service>>> = service.getWebView(servToConnect, token)

        call.enqueue(object : Callback<ApiResponse<ArrayList<Service>>> {
            override fun onResponse(
                call: Call<ApiResponse<ArrayList<Service>>>,
                response: Response<ApiResponse<ArrayList<Service>>>
            ) {
                val response_body = response.body()!!.data
                connectionCallback.addConnectedService(servToConnect)
                connectionCallback.setUrl(response_body)
                connectionCallback.updateView()
            }

            override fun onFailure(call: Call<ApiResponse<ArrayList<Service>>>, t: Throwable) {
                error(t.toString())
            }
        })
    }
}
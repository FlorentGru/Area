package com.example.area.view.connection

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProviders
import com.example.area.R

class ConnectionFragment : Fragment() {

    private lateinit var connectionViewModel: ConnectionViewModel

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        connectionViewModel =
            ViewModelProviders.of(this).get(ConnectionViewModel::class.java)
        val root = inflater.inflate(R.layout.connection, container, false)
        return root
    }
}
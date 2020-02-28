package com.example.area.view.networkLocation

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProviders
import com.example.area.R

class NetworkLocationFragment : Fragment()
{
    private lateinit var networkLocationViewModel: NetworkLocationViewModel

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        networkLocationViewModel =
            ViewModelProviders.of(this).get(NetworkLocationViewModel::class.java)
        val root = inflater.inflate(R.layout.config_serveur , container, false)
        return root
    }
}
package com.example.area

import android.os.Bundle
import com.google.android.material.bottomnavigation.BottomNavigationView
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.example.area.view.connection.ConnectionFragment
import com.example.area.view.networkLocation.NetworkFragment
import com.example.area.view.service.ServiceFragment
import kotlinx.android.synthetic.main.navbar.*

class navBar : AppCompatActivity()
{
    private val mOnNavigationItemSelectedListener = BottomNavigationView.OnNavigationItemSelectedListener { item->
        when(item.itemId){
            R.id.connection -> {
                println("Connection pressed")
                replaceFragment(ConnectionFragment())
                return@OnNavigationItemSelectedListener true
            }
            R.id.service -> {
                println("Service pressed")
                replaceFragment(ServiceFragment())
                return@OnNavigationItemSelectedListener true
            }
            R.id.notifications -> {
                println("Ip pressed")
                replaceFragment(NetworkFragment())
                return@OnNavigationItemSelectedListener true
            }
        }
        false
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.navbar)

        nav_view.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener)
    }

    private fun replaceFragment(fragment: Fragment){
        val fragmentTransaction = supportFragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.container, fragment)
        fragmentTransaction.commit()
    }
}
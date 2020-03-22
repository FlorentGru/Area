package com.example.area.view.service

import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.example.area.R
import com.google.gson.Gson
import com.google.gson.annotations.SerializedName
import kotlinx.android.synthetic.main.service_reaction.*
import org.json.JSONArray
import org.json.JSONObject
import java.util.*

class Service_Reaction : AppCompatActivity() {

    data class Param @JvmOverloads constructor(
        @SerializedName("name")
        var name: String? = null,
        @SerializedName("value")
        var value: String? = null)
    data class Reactions @JvmOverloads constructor(
        @SerializedName("service")
        var service: String? = null,
        @SerializedName("name")
        var name: String? = null,
        @SerializedName("params")
        var params: JSONArray? = null
    )

    private lateinit var baseUrl :String
    private lateinit var token :String
    private lateinit var _buttonIssueGithub : Button
    private lateinit var _buttonsendToGmail : Button
    private lateinit var _buttonsendToZoho : Button
    private lateinit var _buttonMessageDiscord : Button
    private lateinit var _buttonMessageSlack : Button
    private lateinit var _buttonAddSongSpotify : Button
    private lateinit var _buttonPlaySongSpotify : Button
    private lateinit var _buttonPauseSpotify : Button
    val gson = Gson()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.service_reaction)
        baseUrl = this?.intent?.getStringExtra("baseUrl")!!
        token = this?.intent?.getStringExtra("token")!!
        var Actions = this?.intent?.extras?.get("Action") as ServiceFragment.Actions

        var Reactions = Reactions()
        val jsonobj = JSONObject()
        val transferReaction = JSONObject()
        val transferAction = JSONObject()
        val url = "$baseUrl/user/areas/new"
        var message : String

        _buttonIssueGithub = findViewById(R.id.sendButtonGithub)
        _buttonsendToGmail = findViewById(R.id.sendButtonGmail)
        _buttonsendToZoho = findViewById(R.id.sendButtonZoho)
        _buttonMessageDiscord = findViewById(R.id.sendButtonDiscord)
        _buttonMessageSlack = findViewById(R.id.sendButtonSlack)
        _buttonAddSongSpotify = findViewById(R.id.sendAddSongButtonSpotify)
        _buttonPlaySongSpotify = findViewById(R.id.sendPlaySongButtonSpotify)
        _buttonPauseSpotify = findViewById(R.id.sendPauseButtonSpotify)


        _buttonIssueGithub.setOnClickListener {
            val GithubService: String = GithubTView.text.toString().toLowerCase()
            var GithubNameIssue : String = ReactionIssueGithub.text.toString()
            val ParamOwner = GithubReactionOwner.text.toString()
            val ParamRepo = GithubReactionrepo.text.toString()

            Reactions.service = GithubService
            Reactions.name = GithubNameIssue
            Reactions.params = JSONArray(gson.toJson(listOf<Param>(Param("owner", ParamOwner), Param("repo", ParamRepo))))

            transferAction.put("service", Actions.service)
            transferAction.put("name", Actions.name)
            transferAction.put("params", Actions.params)

            jsonobj.put("Action", transferAction)

            transferReaction.put("service",Reactions.service)
            transferReaction.put("name",Reactions.name)
            transferReaction.put("params", Reactions.params)

            jsonobj.put("Reaction", transferReaction)

            message = jsonobj.toString()
            println(message)

            val queue = Volley.newRequestQueue(this)

            val volleyEnrollRequest = object : JsonObjectRequest(
                Method.POST, url, jsonobj,
                Response.Listener {
                    Toast.makeText(this, "Actions send", Toast.LENGTH_SHORT).show()
                },
                Response.ErrorListener {
                    Toast.makeText(this, "Error", Toast.LENGTH_SHORT).show()
                })
            {
                override fun getHeaders(): Map<String, String> {
                    val headers = HashMap<String, String>()
                    headers["Authorization"] = " $token"
                    println(url)
                    return headers
                }
            }
            queue.add(volleyEnrollRequest)
        }

        _buttonsendToGmail.setOnClickListener {
            val GmailService: String = GmailTView.text.toString().toLowerCase()
            var GmailNamesendTo : String = ReactionSendToGmail.text.toString()
            val ParamDest = GmailReactionDest.text.toString()
            val ParamSubject = GmailReactionSubject.text.toString()

            Reactions.service = GmailService
            Reactions.name = GmailNamesendTo
            Reactions.params = JSONArray(gson.toJson(listOf<Param>(Param("email", ParamDest), Param("subject", ParamSubject))))

            transferAction.put("service", Actions.service)
            transferAction.put("name", Actions.name)
            transferAction.put("params", JSONArray(gson.toJson(Actions.params)))
            println(Reactions.params)

            jsonobj.put("action", transferAction)

            transferReaction.put("service",Reactions.service)
            transferReaction.put("name",Reactions.name)
            transferReaction.put("params", Reactions.params)

            jsonobj.put("reaction", transferReaction)

            message = jsonobj.toString()
            println(message)

            val queue = Volley.newRequestQueue(this)

            val volleyEnrollRequest = object : JsonObjectRequest(
                Method.POST, url, jsonobj,
                Response.Listener {
                    Toast.makeText(this, "Actions send", Toast.LENGTH_SHORT).show()
                },
                Response.ErrorListener {
                    Toast.makeText(this, "Error", Toast.LENGTH_SHORT).show()
                })
            {
                override fun getHeaders(): Map<String, String> {
                    val headers = HashMap<String, String>()
                    headers["Authorization"] = " $token"
                    println(url)
                    return headers
                }
            }
            queue.add(volleyEnrollRequest)

        }

        _buttonsendToZoho.setOnClickListener {
            val ZohoService: String = ZohoTView.text.toString().toLowerCase()
            var ZohoNamesendTo : String = ReactionSendtToZoho.text.toString()
            val ParamDest = ReactionDestZoho.text.toString()
            val ParamSubject = ReactionSubjectZoho.text.toString()

            Reactions.service = ZohoService
            Reactions.name = ZohoNamesendTo
            Reactions.params = JSONArray(gson.toJson(listOf<Param>(Param("dest", ParamDest), Param("subject", ParamSubject))))

            transferAction.put("service", Actions.service)
            transferAction.put("name", Actions.name)
            transferAction.put("params", JSONArray(gson.toJson(Actions.params)))
            println(Reactions.params)

            jsonobj.put("action", transferAction)

            transferReaction.put("service",Reactions.service)
            transferReaction.put("name",Reactions.name)
            transferReaction.put("params", Reactions.params)

            jsonobj.put("reaction", transferReaction)

            message = jsonobj.toString()
                println(message)

            val queue = Volley.newRequestQueue(this)

            val volleyEnrollRequest = object : JsonObjectRequest(
                Method.POST, url, jsonobj,
                Response.Listener {
                    Toast.makeText(this, "Actions send", Toast.LENGTH_SHORT).show()
                },
                Response.ErrorListener {
                    Toast.makeText(this, "Error", Toast.LENGTH_SHORT).show()
                })
            {
                override fun getHeaders(): Map<String, String> {
                    val headers = HashMap<String, String>()
                    headers["Authorization"] = " $token"
                    println(url)
                    return headers
                }
            }
            queue.add(volleyEnrollRequest)
        }

        _buttonMessageSlack.setOnClickListener {
            val SlackService: String = SlackTView.text.toString().toLowerCase()
            var SlackNamesendTo : String = ReactionMessageSlack.text.toString()
            val ParamUrl = SlackReactionhook.text.toString()

            Reactions.service = SlackService
            Reactions.name = SlackNamesendTo
            Reactions.params = JSONArray(gson.toJson(listOf<Param>(Param("hool", ParamUrl))))

            transferAction.put("service", Actions.service)
            transferAction.put("name", Actions.name)
            transferAction.put("params", JSONArray(gson.toJson(Actions.params)))
            println(Reactions.params)

            jsonobj.put("action", transferAction)

            transferReaction.put("service",Reactions.service)
            transferReaction.put("name",Reactions.name)
            transferReaction.put("params", Reactions.params)

            jsonobj.put("reaction", transferReaction)

            message = jsonobj.toString()
            println(message)

            val queue = Volley.newRequestQueue(this)

            val volleyEnrollRequest = object : JsonObjectRequest(
                Method.POST, url, jsonobj,
                Response.Listener {
                    Toast.makeText(this, "Actions send", Toast.LENGTH_SHORT).show()
                },
                Response.ErrorListener {
                    Toast.makeText(this, "Error", Toast.LENGTH_SHORT).show()
                })
            {
                override fun getHeaders(): Map<String, String> {
                    val headers = HashMap<String, String>()
                    headers["Authorization"] = " $token"
                    println(url)
                    return headers
                }
            }
            queue.add(volleyEnrollRequest)
        }

        _buttonMessageDiscord.setOnClickListener {
            val DiscordService: String = DiscordTView.text.toString().toLowerCase()
            var DiscordNameMessage : String = ReactionMessageDiscord.text.toString()
            val ParamWebhookId = DiscordReactionwebhookurl.text.toString()

            Reactions.service = DiscordService
            Reactions.name = DiscordNameMessage
            Reactions.params = JSONArray(gson.toJson(listOf<Param>(Param("webhookUrl", ParamWebhookId))))

            transferAction.put("service", Actions.service)
            transferAction.put("name", Actions.name)
            transferAction.put("params", JSONArray(gson.toJson(Actions.params)))
            println(Reactions.params)

            jsonobj.put("action", transferAction)

            transferReaction.put("service",Reactions.service)
            transferReaction.put("name",Reactions.name)
            transferReaction.put("params", Reactions.params)

            jsonobj.put("reaction", transferReaction)

            message = jsonobj.toString()
            println(message)

            val queue = Volley.newRequestQueue(this)

            val volleyEnrollRequest = object : JsonObjectRequest(
                Method.POST, url, jsonobj,
                Response.Listener {
                    Toast.makeText(this, "Actions send", Toast.LENGTH_SHORT).show()
                },
                Response.ErrorListener {
                    Toast.makeText(this, "Error", Toast.LENGTH_SHORT).show()
                })
            {
                override fun getHeaders(): Map<String, String> {
                    val headers = HashMap<String, String>()
                    headers["Authorization"] = " $token"
                    println(url)
                    return headers
                }
            }
            queue.add(volleyEnrollRequest)

        }

        _buttonAddSongSpotify.setOnClickListener {
            val SpotifyService: String = SpotifyTView.text.toString().toLowerCase()
            var SpotifyNamesendTo : String = AddSongSpotify.text.toString()

            Reactions.service = SpotifyService
            Reactions.name = SpotifyNamesendTo

            transferAction.put("service", Actions.service)
            transferAction.put("name", Actions.name)
            transferAction.put("params", JSONArray(gson.toJson(Actions.params)))
            println(Reactions.params)

            jsonobj.put("action", transferAction)

            transferReaction.put("service",Reactions.service)
            transferReaction.put("name",Reactions.name)
            transferReaction.put("params", Reactions.params)

            jsonobj.put("reaction", transferReaction)

            message = jsonobj.toString()
            println(message)

            val queue = Volley.newRequestQueue(this)

            val volleyEnrollRequest = object : JsonObjectRequest(
                Method.POST, url, jsonobj,
                Response.Listener {
                    Toast.makeText(this, "Actions send", Toast.LENGTH_SHORT).show()
                },
                Response.ErrorListener {
                    Toast.makeText(this, "Error", Toast.LENGTH_SHORT).show()
                })
            {
                override fun getHeaders(): Map<String, String> {
                    val headers = HashMap<String, String>()
                    headers["Authorization"] = " $token"
                    println(url)
                    return headers
                }
            }
            queue.add(volleyEnrollRequest)
        }

        _buttonPlaySongSpotify.setOnClickListener {
            val SpotifyService: String = SpotifyTView.text.toString().toLowerCase()
            var SpotifyNamesendTo : String = PlaySongSpotify.text.toString()

            Reactions.service = SpotifyService
            Reactions.name = SpotifyNamesendTo

            transferAction.put("service", Actions.service)
            transferAction.put("name", Actions.name)
            transferAction.put("params", JSONArray(gson.toJson(Actions.params)))
            println(Reactions.params)

            jsonobj.put("action", transferAction)

            transferReaction.put("service",Reactions.service)
            transferReaction.put("name",Reactions.name)
            transferReaction.put("params", Reactions.params)

            jsonobj.put("reaction", transferReaction)

            message = jsonobj.toString()
            println(message)

            val queue = Volley.newRequestQueue(this)

            val volleyEnrollRequest = object : JsonObjectRequest(
                Method.POST, url, jsonobj,
                Response.Listener {
                    Toast.makeText(this, "Actions send", Toast.LENGTH_SHORT).show()
                },
                Response.ErrorListener {
                    Toast.makeText(this, "Error", Toast.LENGTH_SHORT).show()
                })
            {
                override fun getHeaders(): Map<String, String> {
                    val headers = HashMap<String, String>()
                    headers["Authorization"] = " $token"
                    println(url)
                    return headers
                }
            }
            queue.add(volleyEnrollRequest)
        }

        _buttonPauseSpotify.setOnClickListener {
            val SpotifyService: String = SpotifyTView.text.toString().toLowerCase()
            var SpotifyNamesendTo : String = PauseSpotify.text.toString()

            Reactions.service = SpotifyService
            Reactions.name = SpotifyNamesendTo

            transferAction.put("service", Actions.service)
            transferAction.put("name", Actions.name)
            transferAction.put("params", JSONArray(gson.toJson(Actions.params)))
            println(Reactions.params)

            jsonobj.put("action", transferAction)

            transferReaction.put("service",Reactions.service)
            transferReaction.put("name",Reactions.name)
            transferReaction.put("params", Reactions.params)

            jsonobj.put("reaction", transferReaction)

            message = jsonobj.toString()
            println(message)

            val queue = Volley.newRequestQueue(this)

            val volleyEnrollRequest = object : JsonObjectRequest(
                Method.POST, url, jsonobj,
                Response.Listener {
                    Toast.makeText(this, "Actions send", Toast.LENGTH_SHORT).show()
                },
                Response.ErrorListener {
                    Toast.makeText(this, "Error", Toast.LENGTH_SHORT).show()
                })
            {
                override fun getHeaders(): Map<String, String> {
                    val headers = HashMap<String, String>()
                    headers["Authorization"] = " $token"
                    println(url)
                    return headers
                }
            }
            queue.add(volleyEnrollRequest)
        }
        return
    }
}
package com.example.area.view.service

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.example.area.R
import com.example.area.navBar
import kotlinx.android.synthetic.main.service.*
import com.google.gson.annotations.SerializedName
import kotlinx.android.synthetic.main.activity_main.*
import org.json.JSONObject
import java.io.Serializable

class ServiceFragment : Fragment() {

    data class Param @JvmOverloads constructor(
        @SerializedName ("name")
        var name: String? = null,
        @SerializedName("value")
        var value: String? = null)
    data class Actions @JvmOverloads constructor(
        @SerializedName ("service")
        var service: String? = null,
        @SerializedName ("name")
        var name: String? = null,
        @SerializedName ("params")
        var params: Param? = null
    )

    private var _view: View? = null
    private lateinit var _buttongmail : Button
    private lateinit var _buttonzoho : Button
    private lateinit var _baseUrl :String

    private lateinit var _buttonPushGithub : Button
    private lateinit var _buttonPullrequestGithub : Button
    private lateinit var _buttonDeletedDropbox : Button
    private lateinit var _buttonCreatedDropbox : Button
    private lateinit var _buttonRenamedDropbox : Button
    private lateinit var _buttonPathchangedDropbox : Button
    private lateinit var _buttonMessageDiscord : Button
    private lateinit var _buttonCountdownTimer : Button
    private lateinit var _buttonLoopTimer : Button

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _view = inflater.inflate(R.layout.service, container, false)
        _baseUrl = activity?.intent?.getStringExtra("baseUrl")!!
        var Action = Actions()

        _buttonPushGithub = _view!!.findViewById(R.id.sendPushGithub)
        _buttonPullrequestGithub = _view!!.findViewById(R.id.sendPullRequestGithub)
        _buttonDeletedDropbox = _view!!.findViewById(R.id.sendDeletedButtonDropbox)
        _buttonCreatedDropbox= _view!!.findViewById(R.id.sendCreateddButtonDropbox)
        _buttonRenamedDropbox =_view!!.findViewById(R.id.sendRenameddButtonDropbox)
        _buttonPathchangedDropbox =_view!!.findViewById(R.id.sendPathChangedButtonDropbox)
        _buttonMessageDiscord = _view!!.findViewById(R.id.sendMessageDiscord)
        _buttonCountdownTimer =_view!!.findViewById(R.id.sendCountDownButtonTimer)
        _buttonLoopTimer =_view!!.findViewById(R.id.sendLoopButtonTimer)

        //Todo : Envoyer au serveur les actions avec ce qui à été récupérer en dessous et stocker dans la data class Actions


        _buttonPushGithub.setOnClickListener {
            val GithubService: String = ActionGithubTView.text.toString().toLowerCase()
            var GithubNamePush : String = ActionPushGithub.text.toString()
            val ParamOwner: String = PushOwnerGithub.text.toString().toLowerCase()
            val ParamRepo: String = PushRepoGithub.text.toString().toLowerCase()

            Action.service = GithubService
            Action.name = GithubNamePush
            Action.params = Param(ParamOwner, "String")
            Action.params = Param(ParamRepo, "String")
            Toast.makeText(activity, GithubService + GithubNamePush, Toast.LENGTH_SHORT).show()

            val intent = Intent(activity, Service_Reaction::class.java)
            intent.putExtra("baseUrl", _baseUrl)
            intent.putExtra("Action", Action)
            startActivity(intent)
        }

        _buttonPullrequestGithub.setOnClickListener {
            val GithubService: String = ActionGithubTView.text.toString().toLowerCase()
            val GithubNamePullrequest: String = ActionPullRequestGithub.text.toString()
            val ParamRepo: String = PullRequestRepoGithub.text.toString().toLowerCase()
            val ParamOwner: String = PullRequestOwnerGithub.text.toString().toLowerCase()

            Action.service = GithubService
            Action.name = GithubNamePullrequest
            Action.params = Param(ParamOwner, "String")
            Action.params = Param(ParamRepo, "String")
            Toast.makeText(activity, GithubService, Toast.LENGTH_SHORT).show()

            val intent = Intent(activity, Service_Reaction::class.java)
            intent.putExtra("baseUrl", _baseUrl)
            //intent.putExtra("Action", Action as Serializable)
            startActivity(intent)
        }

        _buttonDeletedDropbox.setOnClickListener {
            val DropboxService: String = ActionDropboxTView.text.toString().toLowerCase()
            val DropboxNameDeleted: String = ActionDeletedDropbox.text.toString()

            Action.service = DropboxService
            Action.service = DropboxNameDeleted
            Toast.makeText(activity, DropboxService, Toast.LENGTH_SHORT).show()
        }

        _buttonCreatedDropbox.setOnClickListener {
            val DropboxService: String = ActionDropboxTView.text.toString().toLowerCase()
            val DropboxNameCreated: String = ActionCreatedDropbox.text.toString()

            Action.service = DropboxService
            Action.name = DropboxNameCreated
            Toast.makeText(activity, DropboxService, Toast.LENGTH_SHORT).show()
        }

        _buttonRenamedDropbox.setOnClickListener {
            val DropboxService: String = ActionDropboxTView.text.toString().toLowerCase()
            val DropboxNameRenamed: String = ActionRenamedDropbox.text.toString()

            Action.service = DropboxService
            Action.name = DropboxNameRenamed
        }

        _buttonPathchangedDropbox.setOnClickListener {
            val DropboxService: String = ActionDropboxTView.text.toString().toLowerCase()
            val DropboxNamePatchchanged: String = ActionPathChangedDropbox.text.toString()

            Action.service = DropboxService
            Action.name = DropboxNamePatchchanged
        }

        _buttonMessageDiscord.setOnClickListener {
            val DiscordService: String = ActionDiscordTView.text.toString().toLowerCase()
            val DiscordNameMessage: String = ActionDiscordMessage.text.toString()
            val ParamServer: String = DiscordActionServer.text.toString().toLowerCase()
            val ParamChannel: String = DiscordActionChannel.text.toString().toLowerCase()
            val ParamTrigger: String = DiscordActionTrigger.text.toString().toLowerCase()

            Action.service= DiscordService
            Action.name = DiscordNameMessage
            Action.params = Param(ParamServer, "String")
            Action.params = Param(ParamChannel, "String")
            Action.params = Param(ParamTrigger, "String")
            Toast.makeText(activity, "Discord Message", Toast.LENGTH_SHORT).show()

            val intent = Intent(activity, Service_Reaction::class.java)
            intent.putExtra("baseUrl", _baseUrl)
            intent.putExtra("Action", Action as Serializable)
            startActivity(intent)
        }

        _buttonCountdownTimer.setOnClickListener {
            val TimerService: String = ActionTimerTView.text.toString().toLowerCase()
            val TimerNameCountdown: String = ActionCountdownTimer.text.toString()
            val ParamHours: String = TimerCountDownActionHours.text.toString().toLowerCase()
            val ParamMinutes: String = TimerCountDownActionMinutes.text.toString().toLowerCase()
            val ParamMessage: String = TimerCountDownActionMessage.text.toString().toLowerCase()

            Action.service = TimerService
            Action.name = TimerNameCountdown
            Action.params = Param(ParamHours, "integer")
            Action.params = Param(ParamMinutes, "integer")
            Action.params = Param(ParamMessage, "String")
            Toast.makeText(activity, "Count Timer", Toast.LENGTH_SHORT).show()

            val intent = Intent(activity, Service_Reaction::class.java)
            intent.putExtra("baseUrl", _baseUrl)
            intent.putExtra("Action", Action as Serializable)
            startActivity(intent)
        }

        _buttonLoopTimer.setOnClickListener {
            val TimerService: String = ActionTimerTView.text.toString()
            val TimerNameLoop: String = ActionLoppTimer.text.toString()
            val ParamHours: String = TimerLoopActionHours.text.toString()
            val ParamMinutes: String = TimerLoopActionMinutes.text.toString()
            val ParamMessage: String = TimerLoopActionMessage.text.toString()

            Action.service = TimerService
            Action.name = TimerNameLoop
            Action.params = Param(ParamHours, "integer")
            Action.params = Param(ParamMinutes, "integer")
            Action.params = Param(ParamMessage, "String")
            Toast.makeText(activity, "Loop Timer", Toast.LENGTH_SHORT).show()

            val intent = Intent(activity, Service_Reaction::class.java)
            intent.putExtra("baseUrl", _baseUrl)

            intent.putExtra("Action", Action as Serializable)
            startActivity(intent)
        }

        _buttongmail = _view!!.findViewById(R.id.sendButtonGmail)
        _buttongmail.setOnClickListener {
            Toast.makeText(activity, "Move to Reaction", Toast.LENGTH_SHORT).show()
            val intent = Intent(activity, Service_Reaction::class.java)
            startActivity(intent)
        }
        return _view
    }
}
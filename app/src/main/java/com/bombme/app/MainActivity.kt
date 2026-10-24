package com.bombme.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay

private val Bg = Color(0xFF111318)
private val Panel = Color(0xFF20242B)
private val Panel2 = Color(0xFF292E35)
private val Track = Color(0xFF393F47)
private val Mint = Color(0xFF80D5CB)
private val Fg = Color(0xFFE2E2E9)
private val Muted = Color(0xFFBFC6D3)
private val Selected = Color(0xFF315C58)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { MaterialTheme(colorScheme = darkColorScheme(primary=Mint, onPrimary=Bg, background=Bg, surface=Panel, onSurface=Fg, secondary=Mint)) { BombMeApp() } }
    }
}

@Composable
private fun BombMeApp() {
    var page by remember { mutableStateOf(false) }
    var number by remember { mutableStateOf("") }
    var selected by remember { mutableStateOf(setOf("SMS")) }
    var smsCount by remember { mutableIntStateOf(20) }
    var callCount by remember { mutableIntStateOf(5) }
    var waCount by remember { mutableIntStateOf(15) }
    var processed by remember { mutableIntStateOf(0) }
    var running by remember { mutableStateOf(false) }
    var finished by remember { mutableStateOf(false) }
    val total = (if ("SMS" in selected) smsCount else 0) + (if ("Calls" in selected) callCount else 0) + (if ("WhatsApp" in selected) waCount else 0)
    LaunchedEffect(page, running, processed, total) {
        if (page && running && processed < total && total > 0) {
            delay(250)
            processed = (processed + 1).coerceAtMost(total)
        } else if (page && running && processed >= total && total > 0) {
            running = false
            finished = true
        }
    }
    val progress = if (total > 0) (processed.toFloat() / total).coerceIn(0f, 1f) else 0f
    val animated = animateFloatAsState(progress, tween(450), label = "progress").value

    Column(Modifier.fillMaxSize().background(Bg).verticalScroll(rememberScrollState()).padding(20.dp), verticalArrangement = Arrangement.spacedBy(18.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                Box(Modifier.size(40.dp).clip(RoundedCornerShape(12.dp)).background(Mint), contentAlignment = Alignment.Center) { Icon(Icons.Default.Bolt, null, tint=Bg) }
                Column(verticalArrangement = Arrangement.spacedBy(0.dp)) { Text("Bomb Me", color=Fg, fontSize=20.sp, fontWeight=FontWeight.Bold); Text("Material 3 Expressive", color=Muted, fontSize=12.sp) }
            }
            Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) { Icon(Icons.Default.History, null, tint=Fg); Icon(Icons.Default.Settings, null, tint=Fg) }
        }
        if (!page) {
            Text("New Session", color=Fg, fontSize=26.sp, fontWeight=FontWeight.SemiBold)
            Text("Enter a test number and choose services for a local simulation.", color=Muted, fontSize=14.sp)
            Surface(color=Panel, shape=RoundedCornerShape(28.dp), modifier=Modifier.fillMaxWidth()) {
                Column(Modifier.padding(18.dp), verticalArrangement=Arrangement.spacedBy(14.dp)) {
                    Text("Recipient number", color=Muted)
                    Row(verticalAlignment=Alignment.CenterVertically, horizontalArrangement=Arrangement.spacedBy(8.dp)) {
                        Surface(color=Panel2, shape=RoundedCornerShape(16.dp), modifier=Modifier.defaultMinSize(minHeight=52.dp)) {
                            Row(Modifier.padding(horizontal=14.dp), verticalAlignment=Alignment.CenterVertically, horizontalArrangement=Arrangement.spacedBy(8.dp)) {
                                Text("🇮🇳", fontSize=18.sp); Text("+91", color=Fg, fontWeight=FontWeight.Medium); Icon(Icons.Default.ExpandMore, null, tint=Muted)
                            }
                        }
                        OutlinedTextField(value=number, onValueChange={ number=it.filter(Char::isDigit).take(10) }, modifier=Modifier.weight(1f), placeholder={Text("Enter test number", color=Muted)}, singleLine=true, keyboardOptions=KeyboardOptions(keyboardType=KeyboardType.Phone), shape=RoundedCornerShape(16.dp), colors=OutlinedTextFieldDefaults.colors(focusedBorderColor=Mint, unfocusedBorderColor=Track, focusedTextColor=Fg, unfocusedTextColor=Fg))
                    }
                    HorizontalDivider(color=Track)
                    Text("Select services", color=Fg, fontWeight=FontWeight.Medium)
                    val services = listOf("All", "SMS", "Calls", "WhatsApp")
                    services.chunked(2).forEach { rowItems ->
                        Row(horizontalArrangement=Arrangement.spacedBy(10.dp), modifier=Modifier.fillMaxWidth()) {
                            rowItems.forEach { service ->
                                val active = if (service == "All") selected.size == 3 else service in selected
                                val icon = when(service) { "All"->Icons.Default.Layers; "SMS"->Icons.Default.ChatBubbleOutline; "Calls"->Icons.Default.Call; else->Icons.Default.Forum }
                                Surface(color=if(active) Selected else Panel2, shape=RoundedCornerShape(18.dp), border=androidx.compose.foundation.BorderStroke(1.dp, if(active) Mint else Track), modifier=Modifier.weight(1f).clickable {
                                    selected = when(service) { "All" -> if (selected.size == 3) emptySet() else setOf("SMS","Calls","WhatsApp"); else -> if(service in selected) selected-service else selected+service }
                                }) {
                                    Column(Modifier.padding(14.dp), horizontalAlignment=Alignment.CenterHorizontally, verticalArrangement=Arrangement.spacedBy(8.dp)) { Icon(icon, null, tint=if(active) Mint else Fg); Text(service, color=Fg) }
                                }
                            }
                        }
                    }
                    HorizontalDivider(color=Track)
                    if ("SMS" in selected) CountControl("SMS simulated events", smsCount) { smsCount=it }
                    if ("Calls" in selected) CountControl("Calls simulated events", callCount) { callCount=it }
                    if ("WhatsApp" in selected) CountControl("WhatsApp simulated events", waCount) { waCount=it }
                    Text("Local simulation only. No external messages or calls are sent.", color=Muted, fontSize=12.sp)
                }
            }
            Button(onClick={ processed=0; finished=false; running=true; page=true }, enabled=number.length==10 && total>0, modifier=Modifier.fillMaxWidth().height(56.dp), shape=CircleShape, colors=ButtonDefaults.buttonColors(containerColor=Mint, contentColor=Bg)) { Text("Continue", fontWeight=FontWeight.SemiBold); Spacer(Modifier.width(8.dp)); Icon(Icons.Default.ArrowForward, null) }
        } else {
            Row(verticalAlignment=Alignment.CenterVertically, horizontalArrangement=Arrangement.spacedBy(12.dp)) {
                IconButton(onClick={running=false;page=false}, modifier=Modifier.background(Panel2,CircleShape)) { Icon(Icons.Default.ArrowBack, null, tint=Fg) }
                Column { Text("Live Session", color=Fg, fontSize=25.sp, fontWeight=FontWeight.SemiBold); Text("SESSION · ${selected.joinToString().uppercase()}", color=Muted, fontSize=11.sp) }
            }
            Surface(color=Panel, shape=RoundedCornerShape(28.dp), modifier=Modifier.fillMaxWidth()) {
                Column(Modifier.padding(20.dp), horizontalAlignment=Alignment.CenterHorizontally, verticalArrangement=Arrangement.spacedBy(16.dp)) {
                    Row(verticalAlignment=Alignment.CenterVertically, horizontalArrangement=Arrangement.spacedBy(12.dp), modifier=Modifier.fillMaxWidth()) {
                        Box(Modifier.size(58.dp).clip(RoundedCornerShape(16.dp)).background(Mint), contentAlignment=Alignment.Center) { Icon(Icons.Default.Person, null, tint=Bg) }
                        Column { Text("TEST RECIPIENT", color=Muted, fontSize=11.sp); Text("+91 $number", color=Fg, fontSize=19.sp, fontWeight=FontWeight.SemiBold); Text("Selected: ${selected.joinToString()}", color=Muted, fontSize=12.sp) }
                    }
                    HorizontalDivider(color=Track)
                    Box(Modifier.size(260.dp), contentAlignment=Alignment.Center) {
                        CircularProgressIndicator(progress={animated}, modifier=Modifier.fillMaxSize(), color=Mint, trackColor=Track, strokeWidth=10.dp, strokeCap= androidx.compose.ui.graphics.StrokeCap.Round)
                        CircularProgressIndicator(progress={animated}, modifier=Modifier.size(205.dp), color=Mint, trackColor=Track, strokeWidth=8.dp, strokeCap= androidx.compose.ui.graphics.StrokeCap.Round)
                        Column(horizontalAlignment=Alignment.CenterHorizontally) { Text("${(animated*100).toInt()}%", color=Mint, fontSize=34.sp, fontWeight=FontWeight.Bold); Text(if(finished) "Completed" else if(running) "In progress" else "Stopped", color=Muted) }
                    }
                    LinearProgressIndicator(progress={animated}, modifier=Modifier.fillMaxWidth().height(8.dp).clip(CircleShape), color=Mint, trackColor=Track)
                    Row(Modifier.fillMaxWidth(), horizontalArrangement=Arrangement.SpaceBetween) { Text("Progress", color=Muted); Text("$processed / $total events", color=Fg) }
                }
            }
            Row(horizontalArrangement=Arrangement.spacedBy(12.dp), modifier=Modifier.fillMaxWidth()) {
                StatCard("Processed (simulated)", processed.toString(), Modifier.weight(1f))
                StatCard("Remaining", (total-processed).coerceAtLeast(0).toString(), Modifier.weight(1f))
            }
            Surface(color=Panel, shape=RoundedCornerShape(22.dp), modifier=Modifier.fillMaxWidth()) {
                Column(Modifier.padding(16.dp), verticalArrangement=Arrangement.spacedBy(12.dp)) {
                    Text("Local simulation only. No external messages or calls are sent.", color=Muted, fontSize=12.sp)
                    if(running) Row(verticalAlignment=Alignment.CenterVertically, horizontalArrangement=Arrangement.spacedBy(8.dp)) { CircularProgressIndicator(Modifier.size(18.dp), color=Mint, strokeWidth=2.dp); Text("Automatically processing events…", color=Mint) }
                    else Text(if(finished) "All $total simulation events completed." else "Simulation stopped.", color=if(finished) Mint else Muted)
                    Button(onClick={running=false;page=false}, modifier=Modifier.fillMaxWidth().height(54.dp), shape=CircleShape, colors=ButtonDefaults.buttonColors(containerColor=Color(0xFFB3261E),contentColor=Fg)) { Icon(Icons.Default.Stop, null); Spacer(Modifier.width(8.dp)); Text("Stop and return home") }
                }
            }
        }
        Spacer(Modifier.height(8.dp))
    }
}

@Composable
private fun CountControl(title: String, count: Int, onChange: (Int)->Unit) {
    Column(verticalArrangement=Arrangement.spacedBy(6.dp)) {
        Row(Modifier.fillMaxWidth(), horizontalArrangement=Arrangement.SpaceBetween, verticalAlignment=Alignment.CenterVertically) { Text(title, color=Muted, fontSize=13.sp); Text("$count", color=Mint, fontWeight=FontWeight.Bold) }
        Slider(value=count.toFloat(), onValueChange={onChange(it.toInt().coerceIn(1,100))}, valueRange=1f..100f, steps=98, colors=SliderDefaults.colors(thumbColor=Mint, activeTrackColor=Mint, inactiveTrackColor=Track))
    }
}

@Composable
private fun StatCard(title: String, value: String, modifier: Modifier = Modifier) {
    Surface(color=Panel, shape=RoundedCornerShape(24.dp), modifier=modifier) {
        Column(Modifier.padding(16.dp), verticalArrangement=Arrangement.spacedBy(10.dp)) {
            Icon(if(title.startsWith("Processed")) Icons.Default.CheckCircle else Icons.Default.Schedule, null, tint=Mint)
            Text(title, color=Muted, fontSize=12.sp)
            Text(value, color=Fg, fontSize=30.sp, fontWeight=FontWeight.Bold)
        }
    }
}

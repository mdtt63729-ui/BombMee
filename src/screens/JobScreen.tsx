import React, { useEffect, useRef } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { runSimulation } from '../engine/bomber';
import { saveHistory } from '../data/history';
import { useSettingsStore } from '../state/useSettingsStore';
import { useJobStore } from '../state/useJobStore';
import { ProgressRing } from '../components/ProgressRing';
import { StatChip } from '../components/StatChip';
import { LogRow } from '../components/LogRow';
import { createId } from '../utils/id';
import { colors } from '../theme/colors';
export function JobScreen() {
  const nav = useNavigation<any>(); const rounds = useSettingsStore(s => s.rounds); const intervalMs = useSettingsStore(s => s.intervalMs);
  const current = useJobStore(s => s.current); const logs = useJobStore(s => s.logs); const running = useJobStore(s => s.running);
  const setCurrent = useJobStore(s => s.setCurrent); const addLog = useJobStore(s => s.addLog); const setRunning = useJobStore(s => s.setRunning); const cancel = useJobStore(s => s.cancel); const resetCancel = useJobStore(s => s.resetCancel); const cancelled = useJobStore(s => s.cancelled); const clearLogs = useJobStore(s => s.clearLogs);
  const activeRef = useRef(false);
  useEffect(() => () => { if (activeRef.current) cancel(); }, [cancel]);
  const start = async () => {
    if (running) return;
    clearLogs(); resetCancel(); setRunning(true); activeRef.current = true;
    try {
      const result = await runSimulation({ label: 'Offline demo', rounds, intervalMs }, { onLog: addLog, onProgress: setCurrent, isCancelled: () => useJobStore.getState().cancelled });
      setCurrent(result); await saveHistory(result);
    } catch (error) { const message = error instanceof Error ? error.message : 'Unknown simulation error'; Alert.alert('Simulation error', message); }
    finally { activeRef.current = false; setRunning(false); }
  };
  const stop = () => { cancel(); addLog({ id: createId('log'), at: Date.now(), level: 'warning', message: 'Stop requested…' }); };
  const job = current;
  return <ScrollView contentContainerStyle={styles.page}>
    <View style={styles.banner}><Text style={styles.bannerTitle}>● OFFLINE SIMULATION</Text><Text style={styles.bannerText}>Mock events only. No SMS or network traffic is generated.</Text></View>
    <View style={styles.progressCard}><ProgressRing completed={job?.completed ?? 0} total={job?.rounds ?? rounds}/><View style={styles.progressInfo}><Text style={styles.small}>CURRENT SESSION</Text><Text style={styles.big}>{running ? 'RUNNING' : (job?.status ?? 'READY').toUpperCase()}</Text><Text style={styles.caption}>{job?.completed ?? 0} of {job?.rounds ?? rounds} events</Text><View style={styles.bar}><View style={[styles.fill, { width: `${job?.rounds ? Math.min(100, job.completed / job.rounds * 100) : 0}%` }]}/></View></View></View>
    <View style={styles.stats}><StatChip label="Events" value={job?.completed ?? 0} tone={colors.cyan}/><StatChip label="Success" value={job?.successes ?? 0} tone={colors.green}/><StatChip label="Errors" value={job?.errors ?? 0} tone={colors.red}/></View>
    <View style={styles.actions}><Pressable disabled={running} onPress={start} style={[styles.start, running && styles.disabled]}><Text style={styles.startText}>▶  START</Text></Pressable><Pressable disabled={!running || cancelled} onPress={stop} style={[styles.stop, (!running || cancelled) && styles.disabled]}><Text style={styles.stopText}>■  STOP</Text></Pressable></View>
    <View style={styles.logPanel}><View style={styles.logHeader}><View><Text style={styles.logTitle}>LIVE DIAGNOSTIC LOG</Text><Text style={styles.logSub}>LOCAL EVENT STREAM · {logs.length} lines</Text></View><Pressable onPress={clearLogs}><Text style={styles.clear}>CLEAR</Text></Pressable></View><View style={styles.logBody}>{logs.length ? logs.slice(0, 80).map(item => <LogRow key={item.id} log={item}/>) : <Text style={styles.empty}>Waiting for a local simulation…</Text>}</View></View>
    <Pressable onPress={() => nav.navigate('ApiList')} style={styles.registry}><Text style={styles.registryText}>Inspect mock registry  ↗</Text></Pressable>
  </ScrollView>;
}
const styles = StyleSheet.create({ page: { padding: 18, gap: 15, paddingBottom: 30 }, banner: { backgroundColor: '#21131C', borderColor: '#633047', borderWidth: 1, borderRadius: 12, padding: 13, gap: 5 }, bannerTitle: { color: colors.pink, fontWeight: '900', fontSize: 10, letterSpacing: 1 }, bannerText: { color: colors.muted, fontSize: 11, lineHeight: 16 }, progressCard: { backgroundColor: colors.panel, borderColor: colors.border, borderWidth: 1, borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 20 }, progressInfo: { flex: 1, gap: 6 }, small: { color: colors.muted, fontSize: 9, letterSpacing: 1.3, fontWeight: '800' }, big: { color: colors.text, fontSize: 20, fontWeight: '900' }, caption: { color: colors.muted, fontSize: 11 }, bar: { height: 5, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden', marginTop: 5 }, fill: { height: 5, backgroundColor: colors.pink }, stats: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 }, actions: { flexDirection: 'row', gap: 10 }, start: { flex: 1, padding: 15, alignItems: 'center', borderRadius: 12, backgroundColor: colors.pink }, stop: { flex: 1, padding: 15, alignItems: 'center', borderRadius: 12, backgroundColor: colors.panelAlt, borderColor: colors.red, borderWidth: 1 }, startText: { color: '#fff', fontWeight: '900', fontSize: 12 }, stopText: { color: colors.red, fontWeight: '900', fontSize: 12 }, disabled: { opacity: 0.45 }, logPanel: { backgroundColor: '#090A0F', borderColor: colors.border, borderWidth: 1, borderRadius: 15, overflow: 'hidden' }, logHeader: { padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.panel, borderBottomWidth: 1, borderBottomColor: colors.border }, logTitle: { color: colors.text, fontSize: 11, fontWeight: '900', letterSpacing: 1 }, logSub: { color: colors.muted, fontSize: 8, letterSpacing: 1, marginTop: 4 }, clear: { color: colors.cyan, fontSize: 10, fontWeight: '900' }, logBody: { paddingHorizontal: 12, paddingVertical: 5, minHeight: 160 }, empty: { color: colors.muted, textAlign: 'center', padding: 28, fontSize: 12 }, registry: { padding: 12, alignItems: 'center' }, registryText: { color: colors.cyan, fontWeight: '700', fontSize: 12 } });

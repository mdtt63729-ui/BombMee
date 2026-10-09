import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
export function ProgressRing({ completed, total }: { completed: number; total: number }) {
  const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
  return <View style={styles.outer}><View style={styles.inner}><Text style={styles.percent}>{percent}%</Text><Text style={styles.caption}>COMPLETE</Text></View></View>;
}
const styles = StyleSheet.create({ outer: { width: 124, height: 124, borderRadius: 62, borderWidth: 7, borderColor: colors.pink, alignItems: 'center', justifyContent: 'center', shadowColor: colors.pink, shadowOpacity: 0.2, shadowRadius: 12 }, inner: { alignItems: 'center' }, percent: { color: colors.text, fontSize: 28, fontWeight: '900' }, caption: { color: colors.muted, fontSize: 9, letterSpacing: 1.2, marginTop: 2 } });

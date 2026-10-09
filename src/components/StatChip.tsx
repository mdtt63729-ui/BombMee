import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
export function StatChip({ label, value, tone = colors.cyan }: { label: string; value: string | number; tone?: string }) {
  return <View style={styles.box}><Text style={[styles.value, { color: tone }]}>{value}</Text><Text style={styles.label}>{label}</Text></View>;
}
const styles = StyleSheet.create({ box: { backgroundColor: colors.panelAlt, borderColor: colors.border, borderWidth: 1, borderRadius: 14, paddingVertical: 12, paddingHorizontal: 14, minWidth: 88 }, value: { fontSize: 18, fontWeight: '800' }, label: { color: colors.muted, fontSize: 11, marginTop: 3, letterSpacing: 0.7, textTransform: 'uppercase' } });

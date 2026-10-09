import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
export function NumberInput({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return <View style={styles.wrap}><Text style={styles.label}>{label}</Text><TextInput value={value} onChangeText={onChange} keyboardType="number-pad" selectTextOnFocus style={styles.input} placeholder="0" placeholderTextColor={colors.muted} /><Text style={styles.hint}>{hint ?? 'Local simulation setting'}</Text></View>;
}
const styles = StyleSheet.create({ wrap: { flex: 1, gap: 6 }, label: { color: colors.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' }, input: { color: colors.text, backgroundColor: colors.panelAlt, borderColor: colors.border, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 17, fontWeight: '700' }, hint: { color: colors.muted, fontSize: 10 } });

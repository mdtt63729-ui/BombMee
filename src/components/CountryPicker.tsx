import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
/** Informational placeholder only; no phone-number targeting is implemented. */
export function CountryPicker() { return <View style={styles.box}><Text style={styles.label}>REGION</Text><Text style={styles.value}>◎  Local demo · Offline</Text><Text style={styles.note}>No country code or recipient is used.</Text></View>; }
const styles = StyleSheet.create({ box: { padding: 14, borderRadius: 12, backgroundColor: colors.panelAlt, borderWidth: 1, borderColor: colors.border, gap: 5 }, label: { color: colors.muted, fontSize: 10, letterSpacing: 1.2, fontWeight: '700' }, value: { color: colors.text, fontWeight: '700' }, note: { color: colors.muted, fontSize: 11 } });

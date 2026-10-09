import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { DemoLog } from '../engine/types';
import { colors } from '../theme/colors';
import { formatTime } from '../utils/format';
const tone = { info: colors.cyan, success: colors.green, warning: colors.gold, error: colors.red };
export function LogRow({ log }: { log: DemoLog }) { return <View style={styles.row}><Text style={styles.time}>{formatTime(log.at)}</Text><View style={[styles.dot, { backgroundColor: tone[log.level] }]} /><Text style={styles.message}>{log.message}</Text></View>; }
const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 9, gap: 8 }, time: { color: colors.muted, fontSize: 10, fontVariant: ['tabular-nums'], marginTop: 2 }, dot: { width: 6, height: 6, borderRadius: 3, marginTop: 5 }, message: { color: colors.text, fontSize: 12, lineHeight: 17, flex: 1 } });

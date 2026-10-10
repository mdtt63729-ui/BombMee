import React, { useEffect, useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AboutScreen from './src/screens/AboutScreen';
import { COLORS } from './src/theme/colors';
import { loadTransactions, saveTransactions } from './src/utils/api';

const initial = [
  { id: '1', title: 'Groceries', category: 'Food', amount: 850, type: 'expense', date: new Date().toISOString() },
  { id: '2', title: 'Salary', category: 'Income', amount: 32000, type: 'income', date: new Date().toISOString() },
  { id: '3', title: 'Bus fare', category: 'Travel', amount: 120, type: 'expense', date: new Date().toISOString() },
];
const tabs = [{ id: 'home', icon: '⌂', label: 'Home' }, { id: 'settings', icon: '⚙', label: 'Settings' }, { id: 'about', icon: 'ⓘ', label: 'About' }];

export default function App() {
  const [page, setPage] = useState('home');
  const [transactions, setTransactions] = useState(initial);
  const [currency, setCurrency] = useState('৳');
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState('expense');
  const [ready, setReady] = useState(false);

  useEffect(() => { loadTransactions().then(data => { if (data) setTransactions(data); }).catch(() => {}).finally(() => setReady(true)); }, []);
  useEffect(() => { if (ready) saveTransactions(transactions).catch(() => {}); }, [transactions, ready]);
  const totals = useMemo(() => transactions.reduce((a, t) => { a[t.type] += Number(t.amount) || 0; return a; }, { income: 0, expense: 0 }), [transactions]);
  const add = () => {
    const value = Number(amount);
    if (!title.trim() || !Number.isFinite(value) || value <= 0) { Alert.alert('Check details', 'Enter a title and an amount greater than zero.'); return; }
    setTransactions(list => [{ id: `${Date.now()}`, title: title.trim(), category: category.trim() || 'Other', amount: value, type, date: new Date().toISOString() }, ...list]);
    setTitle(''); setAmount(''); setCategory('Food'); setModal(false);
  };
  const remove = id => Alert.alert('Delete transaction?', 'This action cannot be undone.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: () => setTransactions(list => list.filter(t => t.id !== id)) }]);
  return <SafeAreaView style={s.safe}><StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
    <View style={s.header}><View><Text style={s.brand}>BMB<Text style={{ color: COLORS.green }}>·</Text>Me</Text><Text style={s.tagline}>Your money, in balance.</Text></View><View style={s.avatar}><Text style={s.avatarText}>M</Text></View></View>
    <View style={s.body}>{page === 'home' ? <HomeScreen transactions={transactions} income={totals.income} expense={totals.expense} currency={currency} onDelete={remove} /> : page === 'settings' ? <SettingsScreen currency={currency} setCurrency={setCurrency} count={transactions.length} onReset={() => Alert.alert('Reset demo data?', 'All saved transactions will be removed.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Reset', style: 'destructive', onPress: () => setTransactions([]) }])} /> : <AboutScreen />}</View>
    <View style={s.nav}>{tabs.map(t => <TouchableOpacity key={t.id} style={s.navItem} onPress={() => setPage(t.id)}><Text style={[s.navIcon, page === t.id && s.active]}>{t.icon}</Text><Text style={[s.navLabel, page === t.id && s.active]}>{t.label}</Text></TouchableOpacity>)}</View>
    {page === 'home' && <TouchableOpacity style={s.fab} onPress={() => setModal(true)}><Text style={s.fabText}>＋</Text></TouchableOpacity>}
    <Modal visible={modal} transparent animationType="slide" onRequestClose={() => setModal(false)}><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.overlay}><View style={s.sheet}><View style={s.sheetTop}><Text style={s.sheetTitle}>New transaction</Text><TouchableOpacity onPress={() => setModal(false)}><Text style={s.close}>✕</Text></TouchableOpacity></View>
      <View style={s.toggle}>{['expense', 'income'].map(k => <TouchableOpacity key={k} style={[s.toggleBtn, type === k && s.toggleActive]} onPress={() => setType(k)}><Text style={[s.toggleText, type === k && s.toggleTextActive]}>{k === 'expense' ? 'Expense' : 'Income'}</Text></TouchableOpacity>)}</View>
      <Text style={s.fieldLabel}>AMOUNT ({currency})</Text><TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="0.00" style={s.input} />
      <Text style={s.fieldLabel}>DESCRIPTION</Text><TextInput value={title} onChangeText={setTitle} placeholder="e.g. Lunch" style={s.input} />
      <Text style={s.fieldLabel}>CATEGORY</Text><TextInput value={category} onChangeText={setCategory} placeholder="e.g. Food" style={s.input} />
      <TouchableOpacity style={s.saveBtn} onPress={add}><Text style={s.saveText}>Save transaction</Text></TouchableOpacity>
    </View></KeyboardAvoidingView></Modal>
  </SafeAreaView>;
}
const s = StyleSheet.create({ safe: { flex: 1, backgroundColor: COLORS.bg }, header: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, brand: { fontSize: 26, fontWeight: '900', color: COLORS.ink, letterSpacing: -1 }, tagline: { color: COLORS.muted, marginTop: 2, fontSize: 12 }, avatar: { backgroundColor: '#DFF5E9', width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, avatarText: { color: COLORS.green, fontWeight: '800' }, body: { flex: 1 }, nav: { height: 66, backgroundColor: '#fff', borderTopWidth: 1, borderColor: COLORS.line, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }, navItem: { alignItems: 'center', width: 80 }, navIcon: { color: COLORS.muted, fontSize: 21 }, navLabel: { color: COLORS.muted, fontSize: 10, marginTop: 2 }, active: { color: COLORS.green, fontWeight: '800' }, fab: { position: 'absolute', right: 22, bottom: 82, backgroundColor: COLORS.green, width: 56, height: 56, borderRadius: 19, alignItems: 'center', justifyContent: 'center', elevation: 5 }, fabText: { color: '#fff', fontSize: 30, lineHeight: 34, fontWeight: '300' }, overlay: { flex: 1, backgroundColor: '#0007', justifyContent: 'flex-end' }, sheet: { backgroundColor: '#fff', padding: 24, borderTopLeftRadius: 26, borderTopRightRadius: 26 }, sheetTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }, sheetTitle: { color: COLORS.ink, fontSize: 21, fontWeight: '800' }, close: { color: COLORS.muted, fontSize: 19 }, toggle: { flexDirection: 'row', backgroundColor: COLORS.bg, padding: 4, borderRadius: 12, marginBottom: 18 }, toggleBtn: { flex: 1, padding: 11, alignItems: 'center', borderRadius: 9 }, toggleActive: { backgroundColor: COLORS.green }, toggleText: { color: COLORS.muted, fontWeight: '700' }, toggleTextActive: { color: '#fff' }, fieldLabel: { color: COLORS.muted, fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 7, marginTop: 7 }, input: { borderWidth: 1, borderColor: COLORS.line, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: COLORS.ink, marginBottom: 8 }, saveBtn: { marginTop: 12, padding: 15, borderRadius: 13, backgroundColor: COLORS.green, alignItems: 'center' }, saveText: { color: '#fff', fontWeight: '800', fontSize: 15 } });

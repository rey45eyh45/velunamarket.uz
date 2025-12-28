module.exports = [
"[project]/veluna-next/lib/supabase/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
// =====================================================
// SUPABASE CLIENT - Browser (Client Components)
// =====================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/veluna-next/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://cpvqwudkrgrovlsweads.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_lodoHYlYmXFeS_K8NqLx6w_zm7TZVtb"));
}
}),
"[project]/veluna-next/services/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "getProfile",
    ()=>getProfile,
    "resetPassword",
    ()=>resetPassword,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut,
    "signUp",
    ()=>signUp,
    "updateProfile",
    ()=>updateProfile
]);
// =====================================================
// AUTH SERVICE - API Layer
// =====================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
async function signIn(data) {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
    });
    if (error) {
        console.error('Sign in error:', error);
        return {
            user: null,
            error: 'Email yoki parol noto\'g\'ri'
        };
    }
    return {
        user: authData.user ? {
            id: authData.user.id,
            email: authData.user.email,
            phone: authData.user.phone,
            created_at: authData.user.created_at
        } : null,
        error: null
    };
}
async function signUp(data) {
    const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                full_name: data.full_name,
                phone: data.phone
            }
        }
    });
    if (error) {
        console.error('Sign up error:', error);
        if (error.message.includes('already registered')) {
            return {
                user: null,
                error: 'Bu email allaqachon ro\'yxatdan o\'tgan'
            };
        }
        return {
            user: null,
            error: 'Ro\'yxatdan o\'tishda xatolik'
        };
    }
    // Create profile
    if (authData.user) {
        await supabase.from('profiles').insert({
            id: authData.user.id,
            full_name: data.full_name,
            phone: data.phone
        });
    }
    return {
        user: authData.user ? {
            id: authData.user.id,
            email: authData.user.email,
            phone: authData.user.phone,
            created_at: authData.user.created_at
        } : null,
        error: null
    };
}
async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Sign out error:', error);
        return {
            error: 'Chiqishda xatolik'
        };
    }
    return {
        error: null
    };
}
async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    return {
        id: user.id,
        email: user.email,
        phone: user.phone,
        created_at: user.created_at
    };
}
async function getProfile(userId) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
    return data;
}
async function updateProfile(userId, updates) {
    const { data, error } = await supabase.from('profiles').update(updates).eq('id', userId).select().single();
    if (error) {
        console.error('Error updating profile:', error);
        return {
            profile: null,
            error: 'Profilni yangilashda xatolik'
        };
    }
    return {
        profile: data,
        error: null
    };
}
async function resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${("TURBOPACK compile-time value", "http://localhost:3000")}/auth/reset-password`
    });
    if (error) {
        console.error('Reset password error:', error);
        return {
            error: 'Xatolik yuz berdi'
        };
    }
    return {
        error: null
    };
}
}),
"[project]/veluna-next/app/auth/register/RegisterForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RegisterForm",
    ()=>RegisterForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/veluna-next/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/veluna-next/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-ssr] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/veluna-next/components/ui/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/components/ui/Button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/components/ui/Input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$store$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/veluna-next/store/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$store$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/store/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/services/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/veluna-next/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
// =====================================================
// REGISTER FORM - Client Component
// =====================================================
'use client';
;
;
;
;
;
;
;
;
function RegisterForm() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { setUser, setProfile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$store$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const validate = ()=>{
        const newErrors = {};
        if (!formData.full_name.trim()) {
            newErrors.full_name = 'Ismingizni kiriting';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email kiriting';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email noto\'g\'ri';
        }
        if (!formData.password) {
            newErrors.password = 'Parol kiriting';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Parollar mos kelmayapti';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const { user, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signUp"])({
                email: formData.email,
                password: formData.password,
                full_name: formData.full_name,
                phone: formData.phone
            });
            if (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(error);
                return;
            }
            if (user) {
                setUser(user);
                // Get profile
                const profile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProfile"])(user.id);
                if (profile) {
                    setProfile(profile);
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Muvaffaqiyatli ro\'yxatdan o\'tdingiz!');
                router.push('/');
            }
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('Xatolik yuz berdi');
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                label: "Ism Familiya",
                placeholder: "Ism Familiya",
                value: formData.full_name,
                onChange: (e)=>setFormData({
                        ...formData,
                        full_name: e.target.value
                    }),
                error: errors.full_name
            }, void 0, false, {
                fileName: "[project]/veluna-next/app/auth/register/RegisterForm.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                label: "Email",
                type: "email",
                placeholder: "email@example.com",
                value: formData.email,
                onChange: (e)=>setFormData({
                        ...formData,
                        email: e.target.value
                    }),
                error: errors.email
            }, void 0, false, {
                fileName: "[project]/veluna-next/app/auth/register/RegisterForm.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                label: "Telefon (ixtiyoriy)",
                type: "tel",
                placeholder: "+998 90 123 45 67",
                value: formData.phone,
                onChange: (e)=>setFormData({
                        ...formData,
                        phone: e.target.value
                    })
            }, void 0, false, {
                fileName: "[project]/veluna-next/app/auth/register/RegisterForm.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                        label: "Parol",
                        type: showPassword ? 'text' : 'password',
                        placeholder: "••••••••",
                        value: formData.password,
                        onChange: (e)=>setFormData({
                                ...formData,
                                password: e.target.value
                            }),
                        error: errors.password
                    }, void 0, false, {
                        fileName: "[project]/veluna-next/app/auth/register/RegisterForm.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setShowPassword(!showPassword),
                        className: "absolute right-3 top-9 text-gray-400 hover:text-gray-600",
                        children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/veluna-next/app/auth/register/RegisterForm.tsx",
                            lineNumber: 137,
                            columnNumber: 27
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/veluna-next/app/auth/register/RegisterForm.tsx",
                            lineNumber: 137,
                            columnNumber: 60
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/veluna-next/app/auth/register/RegisterForm.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/veluna-next/app/auth/register/RegisterForm.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                label: "Parolni tasdiqlash",
                type: "password",
                placeholder: "••••••••",
                value: formData.confirmPassword,
                onChange: (e)=>setFormData({
                        ...formData,
                        confirmPassword: e.target.value
                    }),
                error: errors.confirmPassword
            }, void 0, false, {
                fileName: "[project]/veluna-next/app/auth/register/RegisterForm.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                type: "submit",
                fullWidth: true,
                loading: loading,
                children: "Ro'yxatdan o'tish"
            }, void 0, false, {
                fileName: "[project]/veluna-next/app/auth/register/RegisterForm.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-500 text-center",
                children: [
                    "Ro'yxatdan o'tish orqali siz",
                    ' ',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$veluna$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/terms",
                        className: "text-primary-600 hover:underline",
                        children: "foydalanish shartlari"
                    }, void 0, false, {
                        fileName: "[project]/veluna-next/app/auth/register/RegisterForm.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    "ga rozilik bildirasiz."
                ]
            }, void 0, true, {
                fileName: "[project]/veluna-next/app/auth/register/RegisterForm.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/veluna-next/app/auth/register/RegisterForm.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=veluna-next_9a75bc32._.js.map
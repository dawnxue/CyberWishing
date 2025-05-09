import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import buddhaImg from './assets/buddha.png';
import incenseImg from './assets/incense.png';
import incenseHolderImg from './assets/incense-holder.png';
import backgroundImg from './assets/background.png';
import logo from './assets/logoV1.png';
import { ethers } from "ethers";
import gothicFont from './assets/fonts/GOTHIC.TTF';
import gothicBoldFont from './assets/fonts/GOTHICB.TTF';

// 全局样式
const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: url(${backgroundImg}) center center/cover no-repeat, linear-gradient(135deg, #fff6e5 0%, #ffe6c7 100%);
    font-family: 'GOTHIC', 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
    color: #4b3f2a;
    overflow-x: hidden;
  }

  @font-face {
    font-family: 'GOTHIC';
    src: url(${gothicFont}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'GOTHICB';
    src: url(${gothicBoldFont}) format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  /* 美化滚动条 */
  *::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }
  *::-webkit-scrollbar-thumb {
    background: #ffe6c7;
    border-radius: 8px;
    border: 2px solid #fffaf3;
  }
  *::-webkit-scrollbar-thumb:hover {
    background: #ffb84c;
  }
  *::-webkit-scrollbar-corner {
    background: transparent;
  }

  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #ffe6c7 #fffaf3;
  }
`;

// 颜色与风格
const theme = {
  primary: "#ffb84c",      // 主色
  secondary: "#fff9f0",    // 内容区背景
  accent: "#ff914d",       // 强调色
  border: "#f5e6c7",       // 分割线/边框
  text: "#4b3f2a",         // 主文字
  subtext: "#bfa97a",      // 次要文字
  light: "#fffaf3",        // 页面背景
};

// 顶部导航栏
const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  border-bottom: 1px solid ${theme.border};
  box-sizing: border-box;
`;

const NavLeft = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${theme.primary};
  font-family: 'GOTHICB', 'GOTHIC', 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  /* 多层白色描边+淡橙色阴影+深色投影，立体厚重 */
  text-shadow:
    0 0 2px #fff,
    0 0 4px #fff,
    0 2px 4px #ffb84c88,
    0 4px 8px #ff914d55,
    1px 1px 0 #fff,
    -1px -1px 0 #fff,
    2px 2px 2px #bfa97a55,
    0 6px 12px #bfa97a33,
    3px 3px 8px #bfa97a99;
`;

const NavCenter = styled.div`
  display: flex;
  gap: 32px;
  font-size: 1.1rem;
`;

const NavLink = styled.a`
  color: ${theme.text};
  text-decoration: none;
  font-weight: 500;
  &:hover {
    color: ${theme.accent};
  }
`;

const NavRight = styled.button`
  background: ${theme.primary};
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 24px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  font-family: 'GOTHICB', 'GOTHIC', 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  box-shadow: 0 2px 8px #ffb84c33;
  outline: none;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;

  &:hover {
    background: #ffa726;
    box-shadow: 0 4px 16px #ffb84c44;
    transform: translateY(-2px) scale(1.03);
  }
  &:active {
    background: #ff914d;
    box-shadow: 0 2px 8px #ffb84c33;
    transform: translateY(1px) scale(0.98);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ffe6c755;
  }
`;

// 主体布局
const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 0 0 0;
  max-width: 900px;
  min-width: 600px;
  width: 100%;
  margin: 0 auto;
  gap: 32px;
  box-sizing: border-box;
`;

// 左侧许愿区
const WishSection = styled.section`
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 24px #ffb84c22;
  padding: 32px 32px 24px 32px;
  flex: 3 1 0%;
  min-width: 340px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
`;

const BuddhaFrame = styled.div`
  background: ${theme.secondary};
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 16px;
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Incense = styled.img`
  position: absolute;
  width: 32px;
  height: 32px;
  ${({ pos }) => pos === "top" && "top: 8px; left: 50%; transform: translateX(-50%);"}
  ${({ pos }) => pos === "bottom" && "bottom: 8px; left: 50%; transform: translateX(-50%);"}
  ${({ pos }) => pos === "left" && "left: 8px; top: 50%; transform: translateY(-50%);"}
  ${({ pos }) => pos === "right" && "right: 8px; top: 50%; transform: translateY(-50%);"}
`;

const BuddhaImg = styled.img`
  width: 400px;
  height: 400px;
  z-index: 1;
  object-fit: contain;
`;

const IncenseHolderInFrame = styled.div`
  position: absolute;
  right: 24px;
  bottom: 24px;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 3;
  pointer-events: none;
`;

const Timer = styled.div`
  position: absolute;
  left: 13%;
  top: 56px;
  font-size: 1.1rem;
  color: #4e370d;
  font-family: 'GOTHICB', 'GOTHIC', 'Source Han Sans SC', Arial, sans-serif;
  font-weight: bold;
  z-index: 4;
  letter-spacing: 1px;
  pointer-events: none;
 
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0 0 0;

  span {
    font-weight: 500;
    font-family: 'GOTHIC', 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
    font-size: 0.98rem;
  }
`;

const PriceInput = styled.input`
  width: ${props => props.$wide ? '65px' : '44px'};
  border: 1.5px solid ${theme.border};
  border-radius: 10px;
  padding: 4px 8px;
  font-size: 0.95rem;
  font-family: 'GOTHIC', 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  font-weight: 500;
  color: ${theme.accent};
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #fff;

  &:focus {
    border-color: ${theme.primary};
    box-shadow: 0 0 0 2px #ffecd2aa;
  }
`;

const FreeIncense = styled.button`
  background: none;
  border: none;
  color: ${theme.accent};
  font-size: 1.05rem;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  margin: 0 auto;
  display: block;
  white-space: nowrap;
  outline: none;
  transition: color 0.2s, transform 0.1s;

  &:hover {
    color: #ff6600;
    text-decoration: none;
  }
  &:active {
    color: #ff3300;
    text-decoration: none;
    transform: scale(0.96);
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const OptionRow = styled.div`
  display: flex;
  gap: 16px;
  margin: 16px 0 8px 0;
`;

const OptionBtn = styled.button.attrs(props => ({
  'data-active': props.active
}))`
  background: ${({ active }) => (active ? theme.primary : theme.secondary)};
  color: ${({ active }) => (active ? "#fff" : theme.text)};
  border: none;
  border-radius: 12px;
  padding: 8px 24px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: ${({ active }) => (active ? "0 2px 8px #ffb84c33" : "none")};
  outline: none;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;

  &:hover {
    background: ${({ active }) => (active ? "#ffa726" : "#fff6e5")};
    color: ${({ active }) => (active ? "#fff" : theme.primary)};
    box-shadow: 0 4px 16px #ffb84c44;
    transform: translateY(-2px) scale(1.03);
  }
  &:active {
    background: ${({ active }) => (active ? "#ff914d" : "#ffe6c7")};
    color: ${({ active }) => (active ? "#fff" : theme.primary)};
    box-shadow: 0 2px 8px #ffb84c33;
    transform: translateY(1px) scale(0.98);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ffe6c755;
  }
`;

const WishInput = styled.textarea`
  width: 100%;
  min-height: unset;
  height: auto;
  border: 1px solid ${theme.border};
  border-radius: 10px;
  padding: 6px 10px;
  font-size: 1rem;
  margin: 0 0 8px 0;
  resize: none;
  line-height: 1.5;
  font-family: 'GOTHIC', 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  font-weight: 500;
  color: #ff914d;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: ${theme.primary};
    box-shadow: 0 0 0 2px #ffecd2aa;
  }
`;

const MainActionBtn = styled.button`
  max-width: 200px;      
  width: 100%;
  display: block;
  margin: 12px auto 0 auto;  
  background: linear-gradient(90deg, #ffb84c 60%, #ff914d 100%);
  color: #fff;
  border: none;
  border-radius: 24px;   
  padding: 12px 0;       
  font-size: 1.1rem;     
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 16px #ffb84c33;
  outline: none;
  transition: filter 0.2s, box-shadow 0.2s, transform 0.1s;
  font-family: 'GOTHICB', 'GOTHIC', 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;

  &:hover {
    filter: brightness(1.08) saturate(1.1);
    box-shadow: 0 6px 24px #ffb84c44;
    transform: translateY(-2px) scale(1.03);
  }
  &:active {
    filter: brightness(0.96) saturate(0.9);
    box-shadow: 0 2px 8px #ffb84c33;
    transform: translateY(1px) scale(0.98);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ffe6c755;
  }
`;

// 右侧社区区
const CommunitySection = styled.section`
  flex: 2 1 0%;
  min-width: 240px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  box-sizing: border-box;
`;

const WallBox = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px #ffb84c22;
  padding: 24px;
  height: 320px;
  display: flex;
  flex-direction: column;
`;

const WallTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${theme.primary};
  margin-bottom: 12px;
  font-family: 'GOTHICB', 'GOTHIC', 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
`;

const WishList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

const WishItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid ${theme.secondary};
  font-size: 1rem;
  word-break: break-all;
  &:last-child {
    border-bottom: none;
  }
  .wish-row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    width: 100%;
  }
  .wish-content {
    word-break: break-all;
    white-space: pre-wrap;
    text-align: left;
    flex-shrink: 1;
    min-width: 0;
    max-width: 100%;
  }
  .wish-date {
    color: ${theme.accent};
    font-size: 0.95rem;
    white-space: nowrap;
    margin-left: auto;
    margin-top: 2px;
    flex-shrink: 0;
  }
`;

// 底部区域
const Footer = styled.footer`
  min-height: 72px;
  padding: 32px 0 20px 0;
  text-align: center;
  color: ${theme.text};
  font-size: 1rem;
  border-top: 1px solid ${theme.border};
  box-sizing: border-box;
  margin-top: 32px;
`;

const FooterLinks = styled.div`
  margin-bottom: 8px;
  a {
    color: ${theme.accent};
    margin: 0 12px;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const contractAddress = "0xf1d6afFcd9d5eF0620e502947a1Ab8eb887d5049";
const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "content", "type": "string" },
      { "internalType": "uint256", "name": "incenseHours", "type": "uint256" }
    ],
    "name": "makeWish",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "repayWish",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllWishes",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "wisher", "type": "address" },
          { "internalType": "string", "name": "content", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "bool", "name": "fulfilled", "type": "bool" },
          { "internalType": "uint256", "name": "incense", "type": "uint256" }
        ],
        "internalType": "struct CyberWishing.Wish[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyWishes",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "wisher", "type": "address" },
          { "internalType": "string", "name": "content", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "bool", "name": "fulfilled", "type": "bool" },
          { "internalType": "uint256", "name": "incense", "type": "uint256" }
        ],
        "internalType": "struct CyberWishing.Wish[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRemainingIncenseTime",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getIncenseEndTime",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

const Toast = styled.div`
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: #fffbe6;
  color: #b26a00;
  padding: 14px 32px;
  border-radius: 24px;
  box-shadow: 0 4px 24px #ffb84c33;
  font-size: 1.1rem;
  z-index: 9999;
  opacity: ${props => props.show ? 1 : 0};
  pointer-events: none;
  transition: opacity 0.3s;
`;

const AccountDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const AccountButton = styled.button`
  background: ${theme.primary};
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 24px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  font-family: 'GOTHICB', 'GOTHIC', 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  box-shadow: 0 2px 8px #ffb84c33;
  outline: none;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;

  &:hover {
    background: #ffa726;
    box-shadow: 0 4px 16px #ffb84c44;
    transform: translateY(-2px) scale(1.03);
  }
  &:active {
    background: #ff914d;
    box-shadow: 0 2px 8px #ffb84c33;
    transform: translateY(1px) scale(0.98);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ffe6c755;
  }
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  right: 0;
  top: 110%;
  min-width: 110px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 16px #ffb84c33;
  z-index: 100;
  padding: 4px 0;
  text-align: left;
  font-family: 'GOTHIC', 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;

  ${AccountDropdown}:hover & {
    display: block;
  }
`;

const DropdownItem = styled.button`
  width: 92%;
  margin: 0 auto;
  display: block;
  background: #fff;
  border: none;
  color: ${theme.primary};
  font-size: 1rem;
  padding: 6px 0;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  font-family: 'GOTHICB', 'GOTHIC', 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  font-weight: bold;
  transition: color 0.2s;

  &:hover {
    color: ${theme.accent};
    background: #fff;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ffe6c755;
  }
`;

const ErrorTip = styled.div`
  color: #ff4d4f;
  font-size: 1rem;
  margin: 4px 0 0 0;
  text-align: left;
  width: 100%;
  padding-left: 4px;
  font-family: 'GOTHIC', 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
`;

const IncenseBox = styled.div`
  background: linear-gradient(135deg, #fff9ec 60%, #fff3e0 100%);
  border-radius: 18px;
  box-shadow: 0 2px 12px #ffb84c22;
  padding: 28px 24px 18px 24px;
  margin-bottom: 18px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.div`
  width: 100%;
  text-align: left;
  font-size: 1.1rem;
  color: #ffb84c;
  font-family: 'GOTHICB', 'GOTHIC', Arial, sans-serif;
  margin-bottom: 4px;
  margin-top: 4px;
  letter-spacing: 1px;
`;

const WishBox = styled.div`
  background: linear-gradient(135deg, #fff9ec 60%, #fff3e0 100%);
  border-radius: 18px;
  box-shadow: 0 2px 12px #ffb84c22;
  padding: 22px 20px 16px 20px;
  margin-bottom: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function App() {
  // 状态管理
  const [option, setOption] = useState("wish");
  const [incenseDuration, setIncenseDuration] = useState(1);
  const [incensePrice, setIncensePrice] = useState("0.0001");
  const [durationError, setDurationError] = useState("");
  const [wishText, setWishText] = useState("");
  const [account, setAccount] = useState("");
  const [wishingWall, setWishingWall] = useState([]);
  const [myWishes, setMyWishes] = useState([]);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [incenseEndTime, setIncenseEndTime] = useState(null);
  const [incenseCountdown, setIncenseCountdown] = useState("00:00:00");

  // 价格与时长换算
  function getPriceByDuration(duration) {
    return (duration * 0.0001).toFixed(4);
  }
  function getDurationByPrice(price) {
    return Number(price) / 0.0001;
  }

  // 付费香火描述
  const paidDesc = `Incense Duration: ${incenseDuration} hour${incenseDuration > 1 ? "s" : ""} = ${incensePrice} ETH`;

  // 连接钱包
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (err) {
        alert('用户拒绝连接或发生错误');
      }
    } else {
      alert('请先安装 MetaMask 钱包插件！');
      window.open('https://metamask.io/download/', '_blank');
    }
  };

  // 断开钱包
  const disconnectWallet = () => {
    setAccount("");
  };

  // 许愿
  const makeWish = async () => {
    if (!window.ethereum) {
      showToast("Please install MetaMask wallet first!");
      return;
    }
    if (!wishText) {
      showToast("Please enter your wish!");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const value = ethers.parseEther(String(incensePrice));
      const tx = await contract.makeWish(wishText, incenseDuration, { value });
      await tx.wait();
      showToast("Wish submitted successfully!");
      setWishText("");
      fetchAllWishes();
      fetchMyWishes();
      fetchRemainingTime();
    } catch (err) {
      showToast("Wish failed: " + (err.info?.error?.message || err.message));
    }
  };

  // 获取所有愿望
  const fetchAllWishes = async () => {
    if (!window.ethereum) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      let wishes = await contract.getAllWishes();
      wishes = [...wishes].sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
      setWishingWall(wishes);
    } catch (err) {
      console.error("获取所有愿望失败", err);
    }
  };

  // 获取我的愿望
  const fetchMyWishes = async () => {
    if (!window.ethereum || !account) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      let wishes = await contract.getMyWishes();
      wishes = [...wishes].sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
      console.log("当前钱包地址:", account);
      console.log("getMyWishes 返回：", wishes);
      setMyWishes(wishes);
    } catch (err) {
      console.error("获取我的愿望失败", err);
    }
  };

  // 获取剩余时间
  const fetchRemainingTime = async () => {
    if (!window.ethereum || !account) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const remainingSeconds = await contract.getRemainingIncenseTime();
      if (remainingSeconds > 0) {
        setIncenseEndTime(Date.now() + Number(remainingSeconds) * 1000);
      } else {
        setIncenseEndTime(null);
      }
    } catch (err) {
      console.error("获取剩余时间失败", err);
    }
  };

  useEffect(() => {
    // 页面加载时自动检测钱包连接状态
    const checkWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (err) {
          // 忽略错误
        }
      }
    };
    checkWallet();

    // 监听账户切换
    const handleAccountsChanged = (accounts) => {
      setAccount(accounts[0] || "");
    };
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  useEffect(() => {
    fetchAllWishes();
  }, []);

  useEffect(() => {
    if (account) {
      fetchMyWishes();
      fetchRemainingTime();
    }
  }, [account]);

  useEffect(() => {
    if (!incenseEndTime) {
      setIncenseCountdown("00:00:00");
      return;
    }
    const timer = setInterval(() => {
      const now = Date.now();
      let diff = Math.max(0, Math.floor((incenseEndTime - now) / 1000)); // 剩余秒数
      if (diff <= 0) {
        setIncenseCountdown("00:00:00");
        setIncenseEndTime(null);
        clearInterval(timer);
        return;
      }
      const h = String(Math.floor(diff / 3600)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
      const s = String(diff % 60).padStart(2, "0");
      setIncenseCountdown(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, [incenseEndTime]);

  function showToast(msg, duration = 2000) {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), duration);
  }

  // 购买/点香按钮点击时
  const handleBuy = () => {
    // ...购买逻辑
    handleBuyIncense(Number(incenseDuration)); // 传入小时数
  };

  return (
    <>
      <GlobalStyle />
      <Toast show={toast.show}>{toast.msg}</Toast>
      <Navbar>
        <NavLeft>
          <img src={logo} alt="CyberWishing Logo" style={{ height: '140px', verticalAlign: 'middle' }} />
        </NavLeft>
        <NavCenter>
          {/* <NavLink href="#">Make a Wish</NavLink>
          <NavLink href="#">Wishing Wall</NavLink>
          <NavLink href="#">My Wishes</NavLink> */}
        </NavCenter>
        {account ? (
          <AccountDropdown>
            <AccountButton>
              {account.slice(0, 6)}...{account.slice(-4)}
            </AccountButton>
            <DropdownMenu>
              <DropdownItem onClick={disconnectWallet}>Disconnect</DropdownItem>
            </DropdownMenu>
          </AccountDropdown>
        ) : (
          <NavRight onClick={connectWallet}>Connect</NavRight>
        )}
      </Navbar>

      {/* 主体内容 */}
      <Main>
        {/* 左侧许愿区 */}
        <WishSection>
          <BuddhaFrame>
            <BuddhaImg src={buddhaImg} alt="buddha" />
            <IncenseHolderInFrame>
              <Timer>{incenseCountdown}</Timer>
              <img src={incenseHolderImg} alt="incense holder" width={100} height={100} style={{ display: 'block' }} />
            </IncenseHolderInFrame>
          </BuddhaFrame>
          <SectionTitle>Incense Setting</SectionTitle>
          <IncenseBox style={{ padding: "18px 16px 12px 16px", marginBottom: "16px" }}>
            <PriceRow>
              <span>Incense Duration</span>
              <PriceInput
                type="number"
                min="0"
                step="1"
                value={incenseDuration}
                onChange={e => {
                  const value = e.target.value;
                  setIncenseDuration(Number(value));
                  setIncensePrice(getPriceByDuration(Number(value)));
                }}
              />
              <span>hours =</span>
              <PriceInput
                type="number"
                min="0.0001"
                step="0.0001"
                value={incensePrice}
                onChange={e => {
                  const value = e.target.value;
                  const price = Number(value);
                  const base = 0.0001;
                  if (value === "" || price <= 0) {
                    setDurationError("Please enter a valid price.");
                    setIncensePrice(value);
                    setIncenseDuration("");
                    return;
                  }
                  if (Math.abs(Math.round(price / base) - price / base) > 1e-8) {
                    setDurationError("Price must be a multiple of 0.0001 ETH.");
                    setIncensePrice(value);
                    return;
                  }
                  setDurationError("");
                  setIncensePrice(value);
                  setIncenseDuration(getDurationByPrice(value));
                }}
                $wide
              />
              <span>ETH</span>
            </PriceRow>
            {durationError && (
              <ErrorTip>{durationError}</ErrorTip>
            )}
            <div style={{ margin: "0px 0 0 0", textAlign: "center" }}>
              <FreeIncense
                onClick={() => {
                  setIncenseDuration(0);
                  setIncensePrice("0");
                  setDurationError("");
                }}
              >
                Free Incense (0.5 hour)
              </FreeIncense>
            </div>
          </IncenseBox>
          <SectionTitle style={{ marginTop: '4px' }}>Wish</SectionTitle>
          <WishInput
            rows={2}
            maxLength={100}
            placeholder="Please enter your wish..."
            value={wishText}
            onChange={e => {
              const value = e.target.value;
              const lines = value.split('\n');
              if (lines.length <= 2) {
                setWishText(value);
              } else {
                setWishText(lines.slice(0, 2).join('\n'));
              }
            }}
            style={{ margin: "0 0 8px 0" }}
          />
          <MainActionBtn style={{ margin: "16px auto 0 auto" }} onClick={makeWish}>
            Make a Wish
          </MainActionBtn>
        </WishSection>

        {/* 右侧社区区 */}
        <CommunitySection>
          <WallBox>
            <WallTitle>Wishing Wall</WallTitle>
            <WishList>
              {wishingWall.map((item, idx) => (
                <WishItem key={idx}>
                  <div className="wish-row">
                    <span className="wish-content">
                      {item.content}
                      <span style={{ color: "#aaa", fontSize: "0.9em", marginLeft: 8 }}>
                        {item.fulfilled ? "（已还愿）" : ""}
                      </span>
                    </span>
                    <span className="wish-date">
                      {new Date(Number(item.timestamp) * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </WishItem>
              ))}
            </WishList>
          </WallBox>
          <WallBox>
            <WallTitle>My Wishes</WallTitle>
            <WishList>
              {myWishes.map((item, idx) => (
                <WishItem key={idx}>
                  <div className="wish-row">
                    <span className="wish-content">
                      {item.fulfilled ? "✅ " : ""}
                      {item.content}
                    </span>
                    <span className="wish-date">
                      {new Date(Number(item.timestamp) * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </WishItem>
              ))}
            </WishList>
          </WallBox>
        </CommunitySection>
      </Main>

      {/* 底部区域 */}
      <Footer>
        <FooterLinks>
          <a href="#">About Us</a> | <a href="#">Privacy Policy</a> | 
          <a href="https://twitter.com/dawnx666" target="_blank" rel="noopener noreferrer">Contact</a>
        </FooterLinks>
        <div>CyberWishing @PopCraft</div>
      </Footer>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import menuRedesignStyles from '../assets/styles/menu-redesign.module.css';

export default function MenuRedesign() {
    return (
        <div className={menuRedesignStyles['menu-container']}>
            <div className={menuRedesignStyles['menu-header']}>
                <h1>Main Menu</h1>
            </div>
            <div className={menuRedesignStyles['menu-main']}>
                <div className={menuRedesignStyles['menu-item']}>
                    <div className={menuRedesignStyles['menu-item-top']}></div>
                    <div className={menuRedesignStyles['menu-item-bottom']}></div>
                </div>
                <div className={menuRedesignStyles['menu-item']}>
                    <div className={menuRedesignStyles['menu-item-top']}></div>
                    <div className={menuRedesignStyles['menu-item-bottom']}></div>
                </div>
                <div className={menuRedesignStyles['menu-item']}>
                    <div className={menuRedesignStyles['menu-item-top']}></div>
                    <div className={menuRedesignStyles['menu-item-bottom']}></div>
                </div>
                <div className={menuRedesignStyles['menu-item']}>
                    <div className={menuRedesignStyles['menu-item-top']}></div>
                    <div className={menuRedesignStyles['menu-item-bottom']}>
                        <h3>Media</h3>
                        <h3>&#8594;</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}